import CompleteContent from './CompleteContent';

/**
 * /signup/complete — Stripe Checkout success_url / return_url, and the
 * free-starter landing.
 *
 * Fully server-rendered, including the copy. The query is read here as a prop
 * rather than with `useSearchParams` in the browser, which means the customer's
 * instructions are in the first byte of HTML with no hydration step to wait on
 * or get stuck in. It also makes the page verifiable with curl, which matters
 * more than it sounds: admin checks it that way, and a page whose copy only
 * exists after JS runs looks identical to a missing route.
 *
 * Reading searchParams opts this route out of static generation. That's the
 * correct trade here — it is a post-checkout page nobody benefits from having
 * cached, and correctness at this moment beats a prerender.
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
 * `?plan=` labels the copy and `?type=free` switches it to the free-starter
 * wording. Both are optional: the paid redirect arrives with no params at all
 * (or with only Stripe's traceability `session_id`), and the page must read
 * correctly in that case — which is the common one.
 */
export default async function SignupCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string; type?: string }>;
}) {
  const params = await searchParams;

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
          <CompleteContent
            planName={params.plan || ''}
            isFree={params.type === 'free'}
          />
        </div>
      </div>
    </>
  );
}
