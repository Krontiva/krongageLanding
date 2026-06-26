/**
 * POST /api/paystack/webhook
 *
 * Receives Paystack's server-side charge.success event.
 * This is the authoritative provisioning trigger — it fires from Paystack's
 * servers directly, independent of the user's browser.
 *
 * Flow:
 *   Paystack → POST /api/paystack/webhook
 *     1. Verify Paystack's HMAC signature (x-paystack-signature)
 *     2. Ignore non-charge.success events
 *     3. Reconstruct user + plan from Paystack metadata
 *     4. HMAC-sign and forward to provisioning-api (WEBHOOK_URL)
 *
 * Register this URL in Paystack Dashboard → Settings → API Keys & Webhooks:
 *   https://krongage.io/api/paystack/webhook
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { buildSecureHeaders } from '@/src/lib/webhook-security';
import { verifyPaidAmount } from '@/src/lib/verify-amount';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** Verify Paystack's own HMAC signature on the raw request body */
function verifyPaystackSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature) return false;
  const hash = createHmac('sha256', secret).update(rawBody).digest('hex');
  return hash === signature;
}

/** Turn Paystack custom_fields array into a flat key→value map */
function extractFields(customFields: Array<{ variable_name: string; value: string }> = []): Record<string, string> {
  const map: Record<string, string> = {};
  for (const f of customFields) map[f.variable_name] = f.value ?? '';
  return map;
}

export async function POST(req: NextRequest) {
  // Must read raw body before any JSON parsing — HMAC is over the exact bytes Paystack sent
  const rawBody = await req.text();
  const paystackSig = req.headers.get('x-paystack-signature') ?? '';

  // 1. Verify Paystack's signature
  if (!verifyPaystackSignature(rawBody, paystackSig)) {
    console.warn('[paystack-webhook] Invalid signature — rejected');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  // Helper — relay raw Paystack body to billing endpoint (fire-and-forget)
  function relayToBilling() {
    const billingUrl = process.env.BILLING_WEBHOOK_URL;
    if (!billingUrl) return;
    fetch(billingUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-paystack-signature': paystackSig,
        'User-Agent': 'KronGage-Webhook/1.0',
      },
      body: rawBody,
    }).catch(err => console.error('[paystack-webhook] Billing relay error:', err));
  }

  // 2. Non-charge.success events — relay to billing immediately, nothing to provision
  if (event.event !== 'charge.success') {
    relayToBilling();
    return NextResponse.json({ received: true });
  }

  // 3. charge.success — PROVISION FIRST, then relay billing.
  //    On the last test the billing webhook arrived ~3.5s before the tenant was created,
  //    so it was dropped as "no matching tenant." Provision must complete before billing relay.
  const { data } = event;
  const fields = extractFields(data.metadata?.custom_fields);

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[paystack-webhook] WEBHOOK_URL not configured');
    return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
  }

  // 3b. Anti-tampering: the plan claimed in metadata is client-supplied, so
  //     independently recompute the expected charge and reject underpayment
  //     (e.g. "pay 1 GHS, claim Professional"). data.amount/currency come from
  //     Paystack itself (signature already verified), so they are authoritative.
  const amountCheck = await verifyPaidAmount({
    planId: fields.plan_id || '',
    billing: fields.billing || 'monthly',
    paidPesewas: data.amount,
    currency: data.currency,
  });
  if (!amountCheck.ok) {
    console.warn(
      `[paystack-webhook] Amount verification failed for ${data.reference}: ${amountCheck.reason}`,
    );
    // Do NOT provision. Return 500 so Paystack retries if this was a transient
    // price/rate lookup failure; genuine tampering will keep failing and never
    // provision. A real underpaid charge should be refunded out-of-band.
    return NextResponse.json({ error: 'Amount verification failed' }, { status: 500 });
  }

  // 4. Build the canonical provisioning payload
  //    User fields come from Paystack metadata (set by PaystackCheckout.tsx at transaction init).
  //    Email + name also available on data.customer as fallback.
  const payload = JSON.stringify({
    user: {
      firstName: fields.first_name || data.customer?.first_name || '',
      lastName:  fields.last_name  || data.customer?.last_name  || '',
      email:     data.customer?.email || '',
      company:   fields.company || '',
      phone:     fields.phone   || '',
    },
    plan: {
      id:      fields.plan_id   || '',
      name:    fields.plan_name || '',
      billing: fields.billing   || 'monthly',
    },
    paystack: {
      reference: data.reference,
      status:    data.status,
      amount:    data.amount,
      currency:  data.currency,
    },
    timestamp: new Date().toISOString(),
    source: 'krongage-web',
  });

  // 5. HMAC-sign and forward to provisioning-api — await 200 before billing relay
  const headers = buildSecureHeaders(payload);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: payload,
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('[paystack-webhook] Provisioning failed:', detail);
      // Return 500 so Paystack retries (it retries on non-200 responses)
      return NextResponse.json({ error: 'Provisioning failed' }, { status: 500 });
    }

    console.log('[paystack-webhook] Provisioned:', data.reference);

    // 6. Send welcome email — fire-and-forget
    const userEmail = data.customer?.email;
    const userName = fields.first_name || data.customer?.first_name || '';
    const planName = fields.plan_name || 'your plan';
    if (userEmail) {
      resend.emails.send({
        from: 'KronGage <info@krontiva.com>',
        to: userEmail,
        subject: `Welcome to KronGage — ${planName} account being set up`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
            <div style="background:#0D47A1;padding:24px 32px;border-radius:8px 8px 0 0">
              <h1 style="margin:0;color:#fff;font-size:22px">Welcome to KronGage</h1>
            </div>
            <div style="padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
              <p style="font-size:15px;line-height:1.7">Hi ${userName || 'there'},</p>
              <p style="font-size:15px;line-height:1.7">Payment confirmed — thank you! We're setting up your <strong>${planName}</strong> account now and you'll receive your login details shortly.</p>
              <p style="font-size:15px;line-height:1.7">If you have any questions, reply to this email or reach us at <a href="mailto:support@krontiva.africa" style="color:#0D47A1">support@krontiva.africa</a>.</p>
              <p style="font-size:15px;line-height:1.7;margin-top:24px">— The KronGage Team</p>
            </div>
          </div>
        `,
      }).catch(err => console.error('[paystack-webhook] Welcome email error:', err));
    }

    // 7. Tenant now exists — safe to relay billing event
    relayToBilling();

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error('[paystack-webhook] Network error forwarding to provisioning-api:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
