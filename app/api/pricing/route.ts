/**
 * GET /api/pricing
 *
 * Proxies to admin.krongage.io/api/pricing/plans using the shared WEBHOOK_SECRET.
 * Returns plan prices keyed by plan id so the pricing page can override its
 * hardcoded defaults. Returns 503 if admin is unreachable — the page then
 * falls back to its built-in prices, so the page never breaks.
 *
 * Expected admin response shape:
 *   { "plans": [ { "id": "growth", "monthlyPrice": 5000, "annualPrice": 4400, "currency": "USD" }, ... ] }
 */

import { NextResponse } from 'next/server';

const ADMIN_PRICING_URL = 'https://admin.krongage.io/api/pricing/plans';

export async function GET() {
  const secret = process.env.WEBHOOK_SECRET;

  if (!secret) {
    console.error('[pricing] WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 503 });
  }

  try {
    const res = await fetch(ADMIN_PRICING_URL, {
      headers: { Authorization: `Bearer ${secret}` },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`admin responded ${res.status}`);

    const data = await res.json();
    const plans = data?.plans;

    if (!Array.isArray(plans)) throw new Error('Unexpected response shape');

    return NextResponse.json({ plans, source: data.source ?? 'admin' });

  } catch (err) {
    console.error('[pricing] Admin fetch failed:', err);
    return NextResponse.json({ error: 'Pricing unavailable' }, { status: 503 });
  }
}
