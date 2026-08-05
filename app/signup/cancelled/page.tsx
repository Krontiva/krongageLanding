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
    <div className="min-h-[80vh] flex items-center justify-center px-6 pt-[108px] pb-10 bg-[#f0f7ff]">
      <div className="bg-white rounded-3xl shadow-[0_24px_64px_rgba(13,71,161,0.12)] max-w-[520px] w-full px-12 pt-[52px] pb-12 text-center max-[560px]:px-6 max-[560px]:pt-9 max-[560px]:pb-8">

        <div className="w-[72px] h-[72px] rounded-full bg-[#EEF5FD] flex items-center justify-center mx-auto mb-7">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="17" fill="#0D47A1" opacity=".12" />
            <path d="M12 12l10 10M22 12L12 22" stroke="#0D47A1" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-[30px] font-extrabold text-[#0f172a] tracking-[-0.8px] mb-3 leading-[1.2] max-[560px]:text-2xl">Checkout cancelled</h1>
        <p className="text-[15px] text-[#64748b] leading-[1.7] mb-9">
          <strong className="text-[#0f172a] font-bold">No charge was made</strong> and no account was created. Your free trial is still
          waiting whenever you&apos;re ready — you won&apos;t be charged for the first 14 days.
        </p>

        <a
          href="/pricing"
          className="inline-flex items-center gap-2 bg-[#0D47A1] text-white text-base font-extrabold px-10 py-4 rounded-full transition-[background,transform] hover:bg-[#0a3680] hover:-translate-y-px tracking-[0.01em] max-[560px]:text-[15px] max-[560px]:px-8 max-[560px]:py-[14px]"
        >
          Back to pricing
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>

        <p className="text-[13px] text-[#94a3b8] mt-5 leading-[1.6]">
          Ran into a problem at checkout? Email{' '}
          <a href="mailto:support@krontiva.africa" className="text-[#0D47A1] font-semibold">support@krontiva.africa</a>
          {' '}and we&apos;ll help.
        </p>

      </div>
    </div>
  );
}
