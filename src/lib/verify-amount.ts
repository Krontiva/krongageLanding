/**
 * Server-side payment-amount verification.
 *
 * The browser chooses the Paystack charge amount and the plan metadata, so
 * NEITHER can be trusted (a tampered client could pay 5 GHS while claiming the
 * Professional plan). Before provisioning, we independently recompute what the
 * charge SHOULD have been from authoritative sources and enforce an allowlist:
 * accept EITHER the exact tokenization charge (14-day free-trial signup) OR a
 * charge ≈ the full plan price (legacy charge-now); reject everything between.
 *
 * Authoritative sources (same ones the public proxy routes use):
 *   - Canonical USD plan prices:  admin.krongage.io/api/pricing/plans
 *   - USD→GHS exchange rate:       admin.krongage.io/api/exchange-rate
 *
 * Charges are always made in GHS pesewas. The expected amount mirrors exactly
 * what PaystackCheckout computes:
 *   usdTotal        = annual ? monthlyEquivPrice * 12 : monthlyPrice
 *   expectedPesewas = round(usdTotal * rate) * 100
 *
 * Fails CLOSED: if we cannot establish the canonical price/rate, verification
 * fails. The payment already happened, so returning a non-200 makes Paystack
 * retry the webhook later (once admin is reachable) rather than provisioning on
 * an unverified amount.
 */

import { TOKENIZATION_PESEWAS } from './billing-constants';

const ADMIN_PRICING_URL = 'https://admin.krongage.io/api/pricing/plans';
const ADMIN_RATE_URL = 'https://admin.krongage.io/api/exchange-rate';

/**
 * Tolerance for the rate drifting between the user's checkout and the webhook
 * arriving. The webhook normally lands seconds after payment and both sides read
 * the same hourly-cached rate, so drift is tiny; 2% absorbs rounding + minor
 * drift while still blocking any meaningful underpayment.
 */
const TOLERANCE = 0.02;

interface PlanPrice {
  id: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currency?: string;
}

export interface VerifyResult {
  ok: boolean;
  reason?: string;
  expectedPesewas?: number;
  paidPesewas?: number;
}

async function fetchPlanPrices(secret: string): Promise<Map<string, PlanPrice>> {
  const res = await fetch(ADMIN_PRICING_URL, {
    headers: { Authorization: `Bearer ${secret}` },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`pricing admin responded ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data?.plans)) throw new Error('pricing: unexpected shape');
  return new Map((data.plans as PlanPrice[]).map(p => [p.id, p]));
}

async function fetchRate(secret: string): Promise<number> {
  const res = await fetch(ADMIN_RATE_URL, {
    headers: { Authorization: `Bearer ${secret}` },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`rate admin responded ${res.status}`);
  const data = await res.json();
  if (!data?.rate || typeof data.rate !== 'number') throw new Error('rate: unexpected shape');
  return data.rate;
}

/**
 * Verify that a completed Paystack charge covers the canonical price of the
 * claimed plan. Returns { ok: false, reason } on any mismatch or lookup failure.
 */
export async function verifyPaidAmount(params: {
  planId: string;
  billing: string;
  paidPesewas: number;
  currency: string;
}): Promise<VerifyResult> {
  const { planId, billing, paidPesewas, currency } = params;

  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) return { ok: false, reason: 'WEBHOOK_SECRET not configured' };

  // Charges are only ever made in GHS — anything else is malformed/tampered.
  if (currency !== 'GHS') {
    return { ok: false, reason: `unexpected currency: ${currency}` };
  }
  if (!Number.isFinite(paidPesewas) || paidPesewas <= 0) {
    return { ok: false, reason: `invalid paid amount: ${paidPesewas}` };
  }

  let prices: Map<string, PlanPrice>;
  let rate: number;
  try {
    [prices, rate] = await Promise.all([fetchPlanPrices(secret), fetchRate(secret)]);
  } catch (err) {
    return { ok: false, reason: `could not load canonical price/rate: ${(err as Error).message}` };
  }

  const plan = prices.get(planId);
  if (!plan) return { ok: false, reason: `unknown plan id: ${planId}` };

  const isAnnual = billing === 'annual';
  const monthlyEquiv = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  if (monthlyEquiv == null || monthlyEquiv <= 0) {
    // Free / contact-sales plans must never arrive as a paid charge.
    return { ok: false, reason: `plan ${planId} has no payable ${billing} price` };
  }

  const usdTotal = isAnnual ? monthlyEquiv * 12 : monthlyEquiv;
  const expectedPesewas = Math.round(usdTotal * rate) * 100;
  const minAcceptable = Math.floor(expectedPesewas * (1 - TOLERANCE));

  // Two legitimate charge amounts, everything between is tampering (allowlist):
  //   1. The exact tokenization charge → a 14-day free-trial signup. Paystack
  //      only saves a reusable card after a real charge, so the trial charges a
  //      tiny fixed amount (GHS 1); the platform then sets the first real charge
  //      to day 14. See docs/09-PAYSTACK-SUBSCRIPTIONS-HANDOFF.md §0.
  //   2. ≈ the full plan price → the legacy charge-now flow.
  // Anything in between (e.g. "pay 5 GHS, claim Professional") is rejected.
  if (paidPesewas === TOKENIZATION_PESEWAS) {
    return { ok: true, expectedPesewas, paidPesewas };
  }

  if (paidPesewas < minAcceptable) {
    return {
      ok: false,
      reason: `unexpected amount: paid ${paidPesewas} pesewas, expected either the tokenization charge (${TOKENIZATION_PESEWAS}) or ~full price (${expectedPesewas}, min ${minAcceptable})`,
      expectedPesewas,
      paidPesewas,
    };
  }

  return { ok: true, expectedPesewas, paidPesewas };
}
