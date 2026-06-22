import { NextRequest, NextResponse } from 'next/server';
import { buildSecureHeaders } from '@/src/lib/webhook-security';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
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

    const data = await response.json().catch(() => ({ ok: true }));
    return NextResponse.json({ success: true, upstream: data });

  } catch (err) {
    console.error('[starter-signup] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
