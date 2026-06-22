/**
 * GET /api/exchange-rate
 *
 * Proxies to admin.krongage.io/api/exchange-rate using the shared WEBHOOK_SECRET.
 * Returns 503 if admin is unreachable — no silent fallback.
 */

import { NextResponse } from 'next/server';

const ADMIN_RATE_URL = 'https://admin.krongage.io/api/exchange-rate';

export async function GET() {
  const secret = process.env.WEBHOOK_SECRET;

  if (!secret) {
    console.error('[exchange-rate] WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });
  }

  try {
    const res = await fetch(ADMIN_RATE_URL, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`admin responded ${res.status}`);

    const data = await res.json();
    const rate = data?.rate;

    if (!rate || typeof rate !== 'number') throw new Error('Unexpected response shape');

    return NextResponse.json({ rate, source: data.source ?? 'admin', cached: data.cached ?? false });

  } catch (err) {
    console.error('[exchange-rate] Admin fetch failed:', err);
    return NextResponse.json({ error: 'Rate unavailable' }, { status: 503 });
  }
}
