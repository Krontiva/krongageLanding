export type LivePlan = {
  id: string;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
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
