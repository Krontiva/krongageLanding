/**
 * /signup/cancelled — Stripe Checkout cancel_url.
 *
 * Reached when someone backs out of the Stripe checkout page. No charge was
 * made, no account was created. Configured on the admin side, so this route
 * just has to exist at this exact path.
 *
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §5.
 */

export const metadata = {
  title: 'Checkout cancelled — KronGage',
  robots: { index: false, follow: false },
};

export default function SignupCancelledPage() {
  return (
    <>
      <style>{`
        .sx-wrap {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          background: #f0f7ff;
        }
        .sx-card {
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 24px 64px rgba(13,71,161,.12);
          max-width: 520px;
          width: 100%;
          padding: 52px 48px 48px;
          text-align: center;
        }
        .sx-icon-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #EEF5FD;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
        }
        .sx-title {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.8px;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .sx-body {
          font-size: 15px;
          color: #64748b;
          line-height: 1.7;
          margin-bottom: 36px;
        }
        .sx-body strong { color: #0f172a; font-weight: 700; }
        .sx-btn {
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
        .sx-btn:hover { background: #0a3680; transform: translateY(-1px); }
        .sx-hint {
          font-size: 13px;
          color: #94a3b8;
          margin-top: 20px;
          line-height: 1.6;
        }
        @media (max-width: 560px) {
          .sx-card { padding: 36px 24px 32px; }
          .sx-title { font-size: 24px; }
          .sx-btn { font-size: 15px; padding: 14px 32px; }
        }
      `}</style>

      <div className="sx-wrap">
        <div className="sx-card">

          <div className="sx-icon-ring">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
              <circle cx="17" cy="17" r="17" fill="#0D47A1" opacity=".12"/>
              <path d="M12 12l10 10M22 12L12 22" stroke="#0D47A1" strokeWidth="2.4" strokeLinecap="round"/>
            </svg>
          </div>

          <h1 className="sx-title">Checkout cancelled</h1>
          <p className="sx-body">
            <strong>No charge was made</strong> and no account was created. Your free trial is still
            waiting whenever you&apos;re ready — you won&apos;t be charged for the first 14 days.
          </p>

          <a href="/pricing" className="sx-btn">
            Back to pricing
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <p className="sx-hint">
            Ran into a problem at checkout? Email{' '}
            <a href="mailto:support@krontiva.africa" style={{ color: '#0D47A1', fontWeight: 600 }}>support@krontiva.africa</a>
            {' '}and we&apos;ll help.
          </p>

        </div>
      </div>
    </>
  );
}
