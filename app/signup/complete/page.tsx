'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

/**
 * /signup/complete — Stripe Checkout success_url, and the free-starter landing.
 *
 * Two important constraints (docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §5):
 *
 *  1. Landing here is NOT proof of payment. It's a plain redirect anyone can
 *     visit. Payment truth lives in the Stripe webhook admin receives, so this
 *     page must not say "payment confirmed" or unlock anything.
 *  2. Don't promise instant access. Provisioning runs off that webhook and is
 *     asynchronous. "Check your email" is the correct message.
 *
 * Stripe's success_url is configured on the admin side and carries no query
 * params, so the paid path must read correctly with none. The free-starter modal
 * still passes ?type=free.
 */

function CompleteContent() {
  const params   = useSearchParams();
  const planName = params.get('plan') || '';
  const isFree   = params.get('type') === 'free';

  return (
    <>
      <style>{`
        .sc-wrap {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: #f0f7ff;
        }
        .sc-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(13,71,161,.12);
          max-width: 520px;
          width: 100%;
          padding: 52px 48px 48px;
          text-align: center;
        }
        .sc-icon-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #EEF5FD;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
        }
        .sc-title {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.8px;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .sc-body {
          font-size: 15px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .sc-body strong {
          color: #0f172a;
          font-weight: 700;
        }
        .sc-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0D47A1;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          padding: 16px 40px;
          border-radius: 50px;
          text-decoration: none;
          transition: background .15s, transform .15s;
          letter-spacing: 0.01em;
        }
        .sc-btn:hover {
          background: #0a3680;
          transform: translateY(-1px);
        }
        .sc-hint {
          font-size: 13px;
          color: #94a3b8;
          margin-top: 20px;
          line-height: 1.6;
        }
        .sc-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 36px 0;
        }
        .sc-steps {
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }
        .sc-step {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
        }
        .sc-step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #0D47A1;
          color: #fff;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        @media (max-width: 560px) {
          .sc-card { padding: 36px 24px 32px; }
          .sc-title { font-size: 24px; }
          .sc-btn { font-size: 15px; padding: 14px 32px; }
        }
      `}</style>

      <div className="sc-wrap">
        <div className="sc-card">

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

        </div>
      </div>
    </>
  );
}

export default function SignupCompletePage() {
  return (
    <Suspense>
      <CompleteContent />
    </Suspense>
  );
}
