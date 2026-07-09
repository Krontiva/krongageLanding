/**
 * GET /api/pricing
 *
 * Proxies to admin.krongage.io/api/pricing/plans using the shared WEBHOOK_SECRET.
 * The admin app is the single source of truth for prices — the site holds no
 * hardcoded prices. Returns 503 if admin is unreachable; the pricing page then
 * renders each plan without a price ("—") rather than showing a stale number.
 *
 * Expected admin response shape:
 *   { "plans": [ { "id": "growth", "monthlyPrice": 59, "annualPrice": 52, "currency": "USD" }, ... ] }
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
