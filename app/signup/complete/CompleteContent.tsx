'use client';
import { useSearchParams } from 'next/navigation';

/**
 * The query-dependent half of /signup/complete.
 *
 * `useSearchParams` opts this subtree out of server rendering, so it is
 * deliberately kept to the card's *contents* only. The page shell, the card and
 * the stylesheet live in page.tsx above the Suspense boundary, which means a
 * customer arriving from Stripe sees the branded card immediately instead of an
 * empty page while this hydrates.
 *
 * Two constraints from docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §5:
 *
 *  1. Landing here is NOT proof of payment. It's a plain redirect anyone can
 *     visit. Payment truth lives in the Stripe webhook admin receives, so this
 *     must not say "payment confirmed" or unlock anything.
 *  2. Don't promise instant access. Provisioning runs off that webhook and is
 *     asynchronous. "Check your email" is the correct message.
 *
 * Stripe's success_url may carry `?session_id=…` for support traceability only
 * (§12a) — never read it as proof of anything. The paid path must read correctly
 * with no params at all. The free-starter modal still passes `?type=free`.
 */
export default function CompleteContent() {
  const params   = useSearchParams();
  const planName = params.get('plan') || '';
  const isFree   = params.get('type') === 'free';

  return (
    <>
      {/* Icon */}
      <div className="sc-icon-ring">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="17" fill="#0D47A1" opacity=".12"/>
          <polyline
            points="9,17 14,22 25,11"
            stroke="#0D47A1"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Heading — never claims payment or ready-to-use access */}
      <h1 className="sc-title">
        {isFree ? 'You\'re all set!' : 'Check your email'}
      </h1>
      <p className="sc-body">
        {isFree ? (
          <>Your free <strong>{planName || 'Starter'}</strong> workspace is being created. We&apos;re setting things up — this takes about a minute.</>
        ) : (
          <>
            Your{planName ? <> <strong>{planName}</strong></> : ''} account is being set up now.
            We&apos;ll email your login details to <strong>the address you signed up with</strong> —
            it usually arrives within a minute.
          </>
        )}
      </p>

      {/* Steps */}
      <div className="sc-steps">
        <div className="sc-step">
          <span className="sc-step-num">1</span>
          <span>Check your inbox — you&apos;ll receive an email from <strong>info@krontiva.com</strong> with your login link and a temporary password.</span>
        </div>
        <div className="sc-step">
          <span className="sc-step-num">2</span>
          <span>Sign in with your temporary password. KronGage will prompt you to set a new one on your first login.</span>
        </div>
        {!isFree && (
          <div className="sc-step">
            <span className="sc-step-num">3</span>
            <span>Nothing has been charged today. Your first payment is taken at the end of your <strong>14-day free trial</strong>, and you can cancel before then.</span>
          </div>
        )}
      </div>

      <div className="sc-divider" />

      {/* CTA */}
      <a href={process.env.NEXT_PUBLIC_APP_URL || 'https://web.krongage.io'} className="sc-btn">
        Log in to KronGage
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      <p className="sc-hint">
        Can&apos;t find the email? Check your spam folder (sender: <strong>info@krontiva.com</strong>)
        or contact <a href="mailto:support@krontiva.africa" style={{ color: '#0D47A1', fontWeight: 600 }}>support@krontiva.africa</a>.
      </p>
    </>
  );
}
