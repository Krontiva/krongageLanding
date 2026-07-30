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
    <>
      <style>{`
        .ec-wrap {
          min-height: 70vh;
          background: #f0f7ff;
          padding: 40px 24px 64px;
        }
        .ec-inner {
          max-width: 760px;
          margin: 0 auto;
        }
        .ec-head {
          text-align: center;
          margin-bottom: 28px;
        }
        .ec-title {
          font-size: 28px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.6px;
          margin-bottom: 8px;
        }
        .ec-sub {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }
        .ec-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 24px 64px rgba(13,71,161,.12);
          padding: 28px 24px;
        }
        .ec-state {
          text-align: center;
          padding: 48px 24px;
        }
        .ec-state h2 {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .ec-state p {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .ec-btn {
          display: inline-block;
          background: #0D47A1;
          color: #fff;
          font-weight: 800;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 50px;
          text-decoration: none;
        }
        .ec-back {
          display: block;
          text-align: center;
          margin-top: 20px;
          font-size: 13px;
          color: #64748b;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: underline;
          font-family: inherit;
          width: 100%;
        }
        .ec-skel {
          height: 420px;
          border-radius: 12px;
          background: #eef2f7;
          animation: ec-pulse 1.4s ease-in-out infinite;
        }
        @keyframes ec-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: .55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ec-skel { animation: none; }
        }
        @media (max-width: 560px) {
          .ec-title { font-size: 22px; }
          .ec-card { padding: 20px 14px; }
        }
      `}</style>

      <div className="ec-wrap">
        <div className="ec-inner">

          {status === 'ready' && session && (
            <>
              <div className="ec-head">
                <h1 className="ec-title">Complete your signup</h1>
                <p className="ec-sub">
                  {session.planName ? <><strong>{session.planName}</strong>, billed {session.billing}. </> : null}
                  You won&apos;t be charged today — your card starts the free trial.
                </p>
              </div>

              <div className="ec-card">
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>

              {/* Embedded mode has no cancel_url; this is the cancelled path. */}
              <button
                type="button"
                className="ec-back"
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
            <div className="ec-card"><div className="ec-skel" /></div>
          )}

          {status === 'missing' && (
            <div className="ec-card">
              <div className="ec-state">
                <h2>Start from the pricing page</h2>
                <p>
                  This page needs a checkout session, which is created when you choose a plan.
                  Nothing has been charged.
                </p>
                <a href="/pricing" className="ec-btn">Choose a plan →</a>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="ec-card">
              <div className="ec-state">
                <h2>We couldn&apos;t load checkout</h2>
                <p>Please try again — nothing has been charged.</p>
                <a href="/pricing" className="ec-btn">Back to pricing</a>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
