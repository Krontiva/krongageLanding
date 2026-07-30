/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session by proxying to the admin app, then returns
 * the hosted-checkout URL for the browser to redirect to.
 *
 * This MUST stay server-side: it carries WEBHOOK_SECRET as a bearer token, which
 * must never reach client-side JavaScript.
 *
 * We deliberately send NO amount, currency or price id — admin resolves the
 * Stripe Price from its live catalog. That is what makes it impossible for a
 * tampered browser request to buy Professional at Starter prices, and it is why
 * this route needs no amount-verification guard of its own.
 *
 * Prices are USD end to end. There is no currency conversion anywhere.
 *
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §2.
 */

import { NextRequest, NextResponse } from 'next/server';

const ADMIN_CHECKOUT_URL = 'https://admin.krongage.io/api/billing/checkout-session';

/** Only these are self-serve. `starter` uses /api/signup/starter; `enterprise` is contract-sold. */
const SELF_SERVE_PLANS = ['growth', 'professional'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('[checkout] WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Checkout is not configured' }, { status: 503 });
  }

  let body: {
    plan?: { id?: string; billing?: string };
    user?: { firstName?: string; lastName?: string; email?: string; company?: string; phone?: string };
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const planId = body.plan?.id ?? '';
  const billing = body.plan?.billing === 'annual' ? 'annual' : 'monthly';
  const user = body.user ?? {};
  // Email is the login identity, the Stripe customer email, and the key billing
  // events are matched on — normalise it here so one casing is used everywhere.
  const email = (user.email ?? '').trim().toLowerCase();

  if (!SELF_SERVE_PLANS.includes(planId)) {
    return NextResponse.json({ error: `plan '${planId}' is not self-serve` }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || !user.firstName?.trim() || !user.lastName?.trim()) {
    return NextResponse.json({ error: 'Name and a valid email are required' }, { status: 400 });
  }

  try {
    const res = await fetch(ADMIN_CHECKOUT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        plan: { id: planId, billing },
        user: {
          firstName: user.firstName.trim(),
          lastName: user.lastName.trim(),
          email,
          company: user.company?.trim() || '',
          phone: user.phone?.trim() || '',
        },
        source: 'krongage-web',
      }),
      cache: 'no-store',
      // Session creation is normally ~1.3s. Without a ceiling, an admin host that
      // hangs rather than erroring leaves the customer's button spinning forever;
      // this fails into the visible "try again" state instead.
      signal: AbortSignal.timeout(15_000),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      // A 200 without a url is not a usable session — treat it as an upstream
      // failure rather than redirecting the browser to `undefined`.
      if (!data?.url) {
        console.error('[checkout] Admin returned 200 without a url:', JSON.stringify(data));
        return NextResponse.json({ error: 'Could not start checkout' }, { status: 502 });
      }
      return NextResponse.json({ url: data.url, session_id: data.session_id ?? null });
    }

    // Already has an account — a real user path, not an error.
    //
    // `reason` splits it in two (handoff §2a): `active_account` → "sign in
    // instead"; `subscription_inactive` → a lapsed customer who can restart the
    // plan themselves via the Customer Portal. Pass both fields through and treat
    // login_url as opaque — the inactive variant carries a path, so rebuilding it
    // from NEXT_PUBLIC_APP_URL would drop the destination.
    if (res.status === 409) {
      return NextResponse.json(
        {
          error: 'email already has an account',
          reason: data?.reason === 'subscription_inactive' ? 'subscription_inactive' : 'active_account',
          login_url: data?.login_url || process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io',
        },
        { status: 409 },
      );
    }

    if (res.status === 429) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    // 400 is our bug (bad payload), 401 is a secret mismatch, 503 is admin
    // misconfigured. None of those are the customer's fault or fixable by them,
    // so log the detail and show a generic message.
    console.error(`[checkout] Admin responded ${res.status}:`, JSON.stringify(data));
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 502 });

  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError';
    console.error(`[checkout] Admin fetch ${timedOut ? 'timed out' : 'failed'}:`, err);
    return NextResponse.json({ error: 'Could not start checkout' }, { status: 502 });
  }
}
