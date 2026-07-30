import { Suspense } from 'react';
import CompleteContent from './CompleteContent';

/**
 * /signup/complete — Stripe Checkout success_url / return_url, and the
 * free-starter landing.
 *
 * This file is a server component on purpose. The query-dependent copy lives in
 * CompleteContent, which `useSearchParams` forces to render on the client; the
 * shell, the card and the stylesheet stay here so they are in the server HTML.
 * This is the screen a customer lands on in the second after paying, and an
 * unstyled or empty frame at that moment reads as a failed payment.
 *
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §5.
 */

export const metadata = {
  title: 'Check your email — KronGage',
  // Never index a post-checkout page: it's a dead end for search traffic and
  // landing here out of context implies an account that doesn't exist.
  robots: { index: false, follow: false },
};

/**
 * Shown while CompleteContent hydrates. Mirrors the real content's block sizes
 * so the card doesn't resize under the customer when the copy arrives.
 */
function CompleteSkeleton() {
  return (
    <div className="sc-skel" aria-hidden="true">
      <div className="sc-skel-ring" />
      <div className="sc-skel-line sc-skel-title" />
      <div className="sc-skel-line sc-skel-w90" />
      <div className="sc-skel-line sc-skel-w75" />
      <div className="sc-skel-steps">
        <div className="sc-skel-line sc-skel-w100" />
        <div className="sc-skel-line sc-skel-w85" />
        <div className="sc-skel-line sc-skel-w95" />
      </div>
      <div className="sc-divider" />
      <div className="sc-skel-btn" />
    </div>
  );
}

export default function SignupCompletePage() {
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

        /* Hydration placeholder */
        .sc-skel-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #EEF5FD;
          margin: 0 auto 28px;
        }
        .sc-skel-line {
          height: 12px;
          border-radius: 6px;
          background: #eef2f7;
          margin: 0 auto 12px;
        }
        .sc-skel-title {
          height: 26px;
          width: 62%;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .sc-skel-w100 { width: 100%; }
        .sc-skel-w95  { width: 95%; }
        .sc-skel-w90  { width: 90%; }
        .sc-skel-w85  { width: 85%; }
        .sc-skel-w75  { width: 75%; }
        .sc-skel-steps {
          margin-top: 34px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .sc-skel-btn {
          height: 52px;
          width: 220px;
          border-radius: 50px;
          background: #eef2f7;
          margin: 0 auto;
        }
        .sc-skel-ring,
        .sc-skel-line,
        .sc-skel-btn {
          animation: sc-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sc-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: .55; }
        }
        @media (prefers-reduced-motion: reduce) {
          .sc-skel-ring,
          .sc-skel-line,
          .sc-skel-btn { animation: none; }
        }

        @media (max-width: 560px) {
          .sc-card { padding: 36px 24px 32px; }
          .sc-title { font-size: 24px; }
          .sc-btn { font-size: 15px; padding: 14px 32px; }
        }
      `}</style>

      <div className="sc-wrap">
        <div className="sc-card">
          <Suspense fallback={<CompleteSkeleton />}>
            <CompleteContent />
          </Suspense>
        </div>
      </div>
    </>
  );
}
