'use client';
import { useEffect, useMemo, useState } from 'react';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import {
  readEmbeddedSession,
  clearEmbeddedSession,
  type EmbeddedSession,
} from '@/src/lib/checkout-session';

/**
 * Mounts Stripe's embedded Checkout inside our own page.
 *
 * What this does and does not change, so nobody re-litigates it later:
 *
 *  - The card fields still live in a Stripe-hosted iframe. Our CSS cannot reach
 *    inside it, and it is styled only by Stripe Dashboard → Branding. The win
 *    here is the URL and the surrounding layout, nothing more.
 *  - PCI scope is unchanged from the redirect flow. We never touch card data.
 *  - There is no `cancel_url` in embedded mode — the customer never leaves, so
 *    "cancelled" is the in-page state below rather than /signup/cancelled.
 *  - On completion Stripe navigates to the `return_url` admin configured
 *    (/signup/complete?session_id=…). Landing there is still not proof of
 *    payment; provisioning runs off the webhook admin receives.
 *
 * The publishable key comes back with the session rather than from our env, so
 * the key and the session that key must authenticate against cannot drift.
 */

type Status = 'loading' | 'ready' | 'missing' | 'error';

export default function EmbeddedCheckoutClient() {
  const [session, setSession] = useState<EmbeddedSession | null>(null);
  const [status, setStatus]   = useState<Status>('loading');

  // sessionStorage is client-only, so this can't run during render.
  useEffect(() => {
    const stored = readEmbeddedSession();
    if (!stored) {
      setStatus('missing');
      return;
    }
    setSession(stored);
    setStatus('ready');
  }, []);

  // loadStripe must be called once per key, not on every render — remounting the
  // provider with a fresh promise tears down and rebuilds the iframe.
  const stripePromise = useMemo<Promise<Stripe | null> | null>(
    () =>
      session
        // A rejection here means Stripe.js itself couldn't load — an ad blocker,
        // a CSP rule, a dead network. Swallowing it silently leaves the customer
        // staring at an empty card, so surface our own state instead. The
        // callback is async, so this is not a setState-during-render.
        ? loadStripe(session.publishableKey).catch(() => {
            setStatus('error');
            return null;
          })
        : null,
    [session],
  );

  const options = useMemo(
    () =>
      session
        ? {
            clientSecret: session.clientSecret,
            // Fires just before Stripe navigates to return_url. Clearing here
            // rather than on mount is what lets a refresh re-mount a live
            // session while still not leaving a spent one behind.
            onComplete: clearEmbeddedSession,
          }
        : { clientSecret: null },
    [session],
  );

  return (
    <div className="min-h-[70vh] bg-[#f0f7ff] px-6 pt-[108px] pb-16 max-[900px]:px-3 max-[900px]:pt-24 max-[900px]:pb-12">
      {/* Stripe picks one-column vs two-column from the width we hand its
          iframe — we cannot reach inside it. At the old 760px it rendered
          the narrow variant, which buries the order summary behind "View
          details". Wide enough here that it lays out side-by-side like
          checkout.stripe.com does. */}
      <div className="max-w-[1100px] mx-auto">

        {status === 'ready' && session && (
          <>
            <div className="text-center mb-7">
              <h1 className="text-[28px] font-extrabold text-[#0f172a] tracking-[-0.6px] mb-2 max-[560px]:text-[22px]">Complete your signup</h1>
              <p className="text-sm text-[#64748b] leading-[1.6]">
                {session.planName ? <><strong>{session.planName}</strong>, billed {session.billing}. </> : null}
                You won&apos;t be charged today — your card starts the free trial.
              </p>
            </div>

            {/* No padding: every pixel we take here is a pixel Stripe's iframe
                doesn't get, and the iframe brings its own internal gutters.
                overflow:hidden keeps the rounded corners over the frame. */}
            <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(13,71,161,0.12)] overflow-hidden">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>

            {/* Embedded mode has no cancel_url; this is the cancelled path. */}
            <button
              type="button"
              className="block text-center mt-5 text-[13px] text-[#64748b] bg-transparent border-none cursor-pointer underline font-[inherit] w-full"
              onClick={() => {
                clearEmbeddedSession();
                window.location.href = '/pricing';
              }}
            >
              Cancel and go back to pricing — nothing has been charged
            </button>
          </>
        )}

        {status === 'loading' && (
          <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(13,71,161,0.12)] overflow-hidden">
            <div className="h-[560px] bg-[#eef2f7] animate-[ec-pulse_1.4s_ease-in-out_infinite] motion-reduce:animate-none max-[560px]:h-[460px]" />
          </div>
        )}

        {status === 'missing' && (
          <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(13,71,161,0.12)] overflow-hidden">
            <div className="text-center px-6 py-12">
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-2">Start from the pricing page</h2>
              <p className="text-sm text-[#64748b] leading-[1.6] mb-6">
                This page needs a checkout session, which is created when you choose a plan.
                Nothing has been charged.
              </p>
              <a href="/pricing" className="inline-block bg-[#0D47A1] text-white font-extrabold text-[15px] px-8 py-[14px] rounded-full no-underline">Choose a plan →</a>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-[20px] shadow-[0_24px_64px_rgba(13,71,161,0.12)] overflow-hidden">
            <div className="text-center px-6 py-12">
              <h2 className="text-xl font-extrabold text-[#0f172a] mb-2">We couldn&apos;t load checkout</h2>
              <p className="text-sm text-[#64748b] leading-[1.6] mb-6">Please try again — nothing has been charged.</p>
              <a href="/pricing" className="inline-block bg-[#0D47A1] text-white font-extrabold text-[15px] px-8 py-[14px] rounded-full no-underline">Back to pricing</a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
