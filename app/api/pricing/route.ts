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
import { getLivePlans } from '@/src/lib/pricing';

export async function GET() {
  const plans = await getLivePlans();

  if (!plans) {
    return NextResponse.json({ error: 'Pricing unavailable' }, { status: 503 });
  }

  return NextResponse.json({ plans, source: 'admin' });
}
