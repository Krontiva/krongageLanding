import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json({ error: 'WEBHOOK_URL not configured' }, { status: 500 });
    }

    // Forward the full payload to your server
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional auth header if your server requires it
        ...(process.env.WEBHOOK_SECRET
          ? { 'X-Webhook-Secret': process.env.WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        // User & plan details
        user: body.user,
        plan: body.plan,
        billing: body.billing,
        // Paystack transaction reference
        paystack: {
          reference: body.reference,
          status: body.status,
          amount: body.amount,
          currency: body.currency,
        },
        timestamp: new Date().toISOString(),
        source: 'krongage-web',
      }),
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
