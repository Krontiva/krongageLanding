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
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-[108px] pb-10 bg-[#f0f7ff]">
      <div className="bg-white rounded-3xl shadow-[0_24px_64px_rgba(13,71,161,0.12)] max-w-[520px] w-full px-12 pt-[52px] pb-12 text-center max-[560px]:px-6 max-[560px]:pt-9 max-[560px]:pb-8">
        <CompleteContent
          planName={params.plan || ''}
          isFree={params.type === 'free'}
        />
      </div>
    </div>
  );
}
