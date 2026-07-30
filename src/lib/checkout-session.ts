/**
 * Hand-off of an embedded Checkout session from the pricing modal to /checkout.
 *
 * Why sessionStorage rather than the URL: a client secret in a query string ends
 * up in browser history, in the Referer header of anything the page loads, and in
 * any analytics that records paths. sessionStorage is tab-scoped, survives a
 * refresh of /checkout, and dies with the tab.
 *
 * Neither value here is a credential in the dangerous sense — the client secret
 * is scoped to one Checkout Session and is designed to be held by the browser,
 * and the publishable key is publishable by definition. WEBHOOK_SECRET is the
 * only real secret in this flow and it never leaves app/api/checkout/route.ts.
 *
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §2 + admin's embedded addendum.
 */

const KEY = 'kg.checkout.session';

export interface EmbeddedSession {
  clientSecret: string;
  publishableKey: string;
  sessionId: string | null;
  /** Plan id and cadence, for the summary rail beside the Stripe form. */
  planId: string;
  planName: string;
  billing: 'monthly' | 'annual';
}

export function storeEmbeddedSession(session: EmbeddedSession): void {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    // Private mode or a storage-disabled browser. The caller falls back to the
    // redirect flow rather than routing to a /checkout that can't mount.
    throw new Error('sessionStorage unavailable');
  }
}

export function readEmbeddedSession(): EmbeddedSession | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<EmbeddedSession>;
    if (!parsed.clientSecret || !parsed.publishableKey) return null;
    return {
      clientSecret:   parsed.clientSecret,
      publishableKey: parsed.publishableKey,
      sessionId:      parsed.sessionId ?? null,
      planId:         parsed.planId ?? '',
      planName:       parsed.planName ?? '',
      billing:        parsed.billing === 'annual' ? 'annual' : 'monthly',
    };
  } catch {
    return null;
  }
}

/**
 * Called on completion, and when the customer abandons back to pricing —
 * deliberately NOT on mount, so refreshing /checkout re-mounts the same live
 * session instead of dead-ending.
 *
 * A Checkout Session is single-use. Leaving a spent one behind means a later
 * visit to /checkout mounts it and shows a Stripe expiry error rather than our
 * own "start from pricing" state.
 */
export function clearEmbeddedSession(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* nothing to clear */
  }
}
