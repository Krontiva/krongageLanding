import { NextRequest, NextResponse } from 'next/server';
import { buildSecureHeaders } from '@/src/lib/webhook-security';
import { Resend } from 'resend';

let resend: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

/** True if WEBHOOK_URL was accidentally pointed at the always-200 billing endpoint. */
function isBillingUrl(url: string): boolean {
  const billing = process.env.BILLING_WEBHOOK_URL;
  if (billing && url === billing) return true;
  return /\/billing(\/|$)/.test(url) && !/\/provision\//.test(url);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
    }
    // WEBHOOK_URL must be the provisioning endpoint, not the always-200 billing
    // endpoint — pointing it at billing would silently create no account.
    if (isBillingUrl(webhookUrl)) {
      console.error(
        `[starter-signup] MISCONFIG: WEBHOOK_URL points at a billing endpoint (${webhookUrl}); ` +
        `it must be …/provision/signup. Refusing to provision.`,
      );
      return NextResponse.json({ error: 'WEBHOOK_URL misconfigured' }, { status: 500 });
    }

    // Starter has no paystack block — provision immediately, tenant gets status=active
    const payload = JSON.stringify({
      user:      body.user,           // { firstName, lastName, email, company, phone }
      plan:      { id: 'starter', billing: 'monthly' },
      timestamp: new Date().toISOString(),
      source:    'krongage-web',
    });

    const headers = buildSecureHeaders(payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: payload,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[starter-signup] Provisioning failed:', text);
      return NextResponse.json({ error: 'Signup failed', detail: text }, { status: 502 });
    }

    // A 200 alone is not proof of provisioning — require the { ok:true, tenant_id }
    // success contract (see docs/provisioning-api-signup-endpoint.md §5). A response
    // without tenant_id means the call did not actually create a tenant (e.g. it
    // landed on the always-200 billing endpoint); don't send a welcome email for it.
    const data = await response.json().catch(() => null);
    if (!data || data.ok !== true || !data.tenant_id) {
      console.error(
        `[starter-signup] Provisioning returned 200 but not a valid signup response. ` +
        `Expected { ok:true, tenant_id }, got: ${JSON.stringify(data)}.`,
      );
      return NextResponse.json({ error: 'Provisioning not confirmed' }, { status: 502 });
    }

    // Send welcome email — fire-and-forget, don't block the response
    const { user } = body;
    const client = getResend();
    if (client) {
      client.emails.send({
        from: 'KronGage <info@krontiva.com>',
        to: user.email,
        subject: 'Welcome to KronGage — your account is being set up',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b">
            <div style="background:#0D47A1;padding:24px 32px;border-radius:8px 8px 0 0">
              <h1 style="margin:0;color:#fff;font-size:22px">Welcome to KronGage</h1>
            </div>
            <div style="padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">
              <p style="font-size:15px;line-height:1.7">Hi ${user.firstName},</p>
              <p style="font-size:15px;line-height:1.7">Thanks for signing up for the <strong>Starter plan</strong>. We're setting up your account now and you'll receive login details shortly.</p>
              <p style="font-size:15px;line-height:1.7">If you have any questions in the meantime, just reply to this email or reach us at <a href="mailto:support@krontiva.africa" style="color:#0D47A1">support@krontiva.africa</a>.</p>
              <p style="font-size:15px;line-height:1.7;margin-top:24px">— The KronGage Team</p>
            </div>
          </div>
        `,
      }).catch(err => console.error('[starter-signup] Welcome email error:', err));
    } else {
      console.error('[starter-signup] RESEND_API_KEY not configured — welcome email skipped');
    }

    return NextResponse.json({ success: true, upstream: data });

  } catch (err) {
    console.error('[starter-signup] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
