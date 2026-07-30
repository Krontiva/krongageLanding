export type LivePlan = {
  id: string;
  monthlyPrice?: number | null;
  /** Discounted monthly-equivalent, rounded. Superseded by annualPricePerMonth. */
  annualPrice?: number | null;
  /**
   * Exact figures, added by admin 2026-07-29 after both sides were double-rounding
   * (52 × 12 = $624 displayed against a $623.04 charge).
   *
   * `annualTotal` is the number Stripe actually charges on an annual plan — always
   * render the annual figure from it, never from annualPrice × 12. The older
   * monthlyPrice / annualPrice keys are still sent, so these stay optional and the
   * page falls back cleanly if a deploy lands out of order.
   */
  annualTotalCents?: number | null;
  annualTotal?: number | null;
  annualPricePerMonth?: number | null;
  monthlyPriceCents?: number | null;
  /** Free-trial length admin applies in Stripe — both cadences get one. */
  trialDays?: number | null;
  currency?: string;
};

const ADMIN_PRICING_URL = 'https://admin.krongage.io/api/pricing/plans';

/**
 * Fetches live plan prices from the admin app — the single source of truth
 * for pricing. Used server-side so the pricing page's first paint already
 * reflects admin-set prices. Returns null if the fetch fails; the page then
 * renders plans without a price rather than falling back to any hardcoded value.
 */
export async function getLivePlans(): Promise<LivePlan[] | null> {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('[pricing] WEBHOOK_SECRET not set');
    return null;
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

    return plans;
  } catch (err) {
    console.error('[pricing] Admin fetch failed:', err);
    return null;
  }
}
