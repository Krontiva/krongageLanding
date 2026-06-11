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

  // 2. Only act on successful charges — acknowledge everything else silently
  if (event.event !== 'charge.success') {
    return NextResponse.json({ received: true });
  }

  const { data } = event;
  const fields = extractFields(data.metadata?.custom_fields);

  const webhookUrl = process.env.WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[paystack-webhook] WEBHOOK_URL not configured');
    return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
  }

  // 3. Build the canonical provisioning payload
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

  // 4. HMAC-sign and forward to provisioning-api
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
    return NextResponse.json({ received: true });

  } catch (err) {
    console.error('[paystack-webhook] Network error forwarding to provisioning-api:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
