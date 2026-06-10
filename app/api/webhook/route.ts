import { NextRequest, NextResponse } from 'next/server';
import { buildSecureHeaders } from '@/src/lib/webhook-security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
    }

    // Build the canonical payload we'll forward to your server
    const payload = JSON.stringify({
      user: body.user,          // { firstName, lastName, email, company, phone }
      plan: body.plan,          // { id, name, billing }
      paystack: {
        reference: body.reference,
        status:    body.status,
        amount:    body.amount,
        currency:  body.currency,
      },
      timestamp: new Date().toISOString(),
      source: 'krongage-web',
    });

    // Build HMAC-signed headers (X-KronGage-Signature + X-KronGage-Timestamp)
    const headers = buildSecureHeaders(payload);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: payload,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Webhook upstream error:', text);
      return NextResponse.json({ error: 'Upstream webhook failed', detail: text }, { status: 502 });
    }

    const data = await response.json().catch(() => ({ ok: true }));
    return NextResponse.json({ success: true, upstream: data });

  } catch (err) {
    console.error('Webhook route error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
