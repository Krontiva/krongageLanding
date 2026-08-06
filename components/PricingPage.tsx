'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle } from '@phosphor-icons/react';
import { formatUsd } from '@/src/lib/format-price';
import { Switch } from '@/components/ui/switch';

const CheckoutModal      = dynamic(() => import('./CheckoutModal'),       { ssr: false });
const StarterSignupModal = dynamic(() => import('./StarterSignupModal'),  { ssr: false });

type Plan = {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number | null;
  /** Discounted monthly-equivalent — the big "/mo" figure on the annual toggle. */
  annualPrice: number | null;
  /** What Stripe charges for a year. Never derive this by multiplying by 12. */
  annualTotal?: number | null;
  trialDays?: number | null;
  currency: string;
  badge: string | null;
  featured: boolean;
  free: boolean;
  enterprise: boolean;
  cta: string;
  ctaHref: string | null;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Free',
    tagline: 'Get started at no cost',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    badge: null,
    featured: false,
    free: true,
    enterprise: false,
    cta: 'Get Started Free',
    ctaHref: '/contact',
    features: [
      '1 team member',
      'KronChat — WhatsApp & Email',
      'Social Publishing — X, LinkedIn, Facebook, Telegram',
      '10 social posts / month',
      'KronCampaign — SMS only · 50 contacts/mo · 1 campaign',
      '5,000 AI tokens / month',
      '7-day data retention',
      'Data archive requests',
      'Email support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    badge: 'Most Popular',
    featured: true,
    free: false,
    enterprise: false,
    cta: 'Start Growth Plan',
    ctaHref: null,
    features: [
      '5 team members',
      'KronChat — any 3 channels',
      'Social Publishing — X, LinkedIn, Instagram, Facebook, Threads, Telegram, YouTube, Pinterest',
      '25 social posts / month',
      'KronCampaign — 125 contacts/mo · 5 campaigns',
      '50,000 AI tokens / month',
      '30-day data retention',
      'Data archive requests',
      'Email support · Self-serve onboarding',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For established businesses',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    badge: null,
    featured: false,
    free: false,
    enterprise: false,
    cta: 'Start Professional Plan',
    ctaHref: null,
    features: [
      '10 team members',
      'KronChat — any 5 channels',
      'Social Publishing — all channels',
      '100 social posts / month',
      'KronCampaign — 200 contacts/mo · 10 campaigns',
      '500,000 AI tokens / month',
      '90-day data retention',
      'Data archive requests',
      'Customer 360 CDP (unified profiles)',
      'SLA policies · 99.9% uptime',
      'Priority support · Guided onboarding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For large organisations',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    badge: null,
    featured: false,
    free: false,
    enterprise: true,
    cta: 'Contact Sales',
    ctaHref: '/contact',
    features: [
      'Deployment — on-prem & cloud',
      'Unlimited team members & channels',
      'Customer 360 CDP — all 4 scoring models',
      'Social Listening (enterprise-grade)',
      'Knowledge / RAG (enterprise)',
      'Custom AI model training + BYOK',
      'Identity resolution + CRM connectors',
      'Data residency / on-prem control',
      'Dedicated CSM · White-glove onboarding',
      'Custom SLA',
    ],
  },
];

const COMPARISON_ROWS = [
  ['Team members',           '1',               '5',          '10',          'Unlimited'],
  ['KronChat channels',      'WhatsApp, Email', 'Any 3',      'Any 5',       'Unlimited'],
  ['KronChat Captain AI',    '100 msgs',        '1,000 msgs', '10,000 msgs', '500K+'],
  ['Social channels',        '4',               '8',          'All',         'All'],
  ['Social posts / mo',      '10',              '25',         '100',         'Custom'],
  ['Campaign contacts / mo', '50',              '125',        '200',         'Custom'],
  ['Campaigns / mo',         '1',               '5',          '10',          'Custom'],
  ['AI tokens / mo',         '5,000',           '50,000',     '500,000',     'Custom'],
  ['Data retention',         '7 days',          '30 days',    '90 days',     'Custom'],
  ['Customer 360 CDP',       '—',               '—',          '✓',           '✓'],
  ['Social Listening',       '—',               '—',          '—',           '✓'],
  ['Knowledge / RAG',        '—',               '—',          '—',           '✓'],
  ['Uptime SLA',             '—',               '—',          '99.9%',       'Custom'],
  ['Data archive requests',  '✓',               '✓',          '✓',           '✓'],
  ['Support',                'Email',            'Email',      'Priority',    'Dedicated CSM'],
];

type LivePlan = {
  id: string;
  monthlyPrice?: number | null;
  annualPrice?: number | null;
  annualTotal?: number | null;
  annualPricePerMonth?: number | null;
  trialDays?: number | null;
  currency?: string;
};

/** Used only if admin omits trialDays; admin's value always wins. */
const FALLBACK_TRIAL_DAYS = 14;

// Prices are owned entirely by the admin app — the code holds NO hardcoded
// prices. This applies the admin-supplied prices to each plan's marketing
// shell (name, tagline, features, which admin does not provide). Any plan the
// admin doesn't return a price for stays null and renders as "unavailable"
// rather than showing a stale hardcoded number.
function mergeLivePlans(livePlans: LivePlan[] | null | undefined) {
  const byId = new Map(
    Array.isArray(livePlans) ? livePlans.map(p => [p.id, p] as const) : []
  );
  return PLANS.map(plan => {
    const live = byId.get(plan.id);

    // Prefer admin's exact figures; fall back to the older rounded keys so an
    // out-of-order deploy degrades to today's behaviour instead of blank prices.
    const annualPerMonth = live?.annualPricePerMonth ?? live?.annualPrice ?? null;
    const annualTotal =
      live?.annualTotal ?? (annualPerMonth != null ? annualPerMonth * 12 : null);

    return {
      ...plan,
      monthlyPrice: live?.monthlyPrice ?? null,
      annualPrice:  annualPerMonth,
      annualTotal,
      trialDays:    live?.trialDays ?? FALLBACK_TRIAL_DAYS,
      currency:     live?.currency  ?? plan.currency,
    };
  });
}

type MergedPlan = ReturnType<typeof mergeLivePlans>[number];

export default function PricingPage({ initialLivePlans }: { initialLivePlans?: LivePlan[] | null }) {
  const [annual, setAnnual]               = useState(false);
  const [plans, setPlans]                 = useState(() => mergeLivePlans(initialLivePlans));
  const [checkoutPlan, setCheckoutPlan]   = useState<MergedPlan | null>(null);
  const [showStarterModal, setShowStarterModal] = useState(false);

  // First-charge date, resolved after mount only. This page is prerendered, so a
  // build-time date would both go stale and mismatch on hydration; until it's
  // set the copy says "day N" instead of a date.
  const [firstChargeDate, setFirstChargeDate] = useState<string | null>(null);
  useEffect(() => {
    const days = plans.find(p => p.trialDays != null)?.trialDays ?? FALLBACK_TRIAL_DAYS;
    setFirstChargeDate(
      new Date(Date.now() + days * 864e5).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      }),
    );
  }, [plans]);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#eef0ee] text-center px-6 pt-[148px] pb-14 max-[640px]:px-5 max-[640px]:pt-[124px] max-[640px]:pb-10">
        <div className="inline-flex items-center gap-2 bg-[#0D47A1] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-[18px] py-1.5 rounded-full mb-6">Simple, Transparent Pricing</div>
        <h1 className="text-[44px] font-normal text-[#0f172a] leading-[1.15] tracking-[-1px] mb-3 max-[1024px]:text-[34px] max-[640px]:text-[28px]">Plans that grow<br />with your team</h1>
        <p className="text-base text-[#64748b] leading-[1.75] max-w-[480px] mx-auto mb-10 max-[640px]:text-[15px]">Start free. Scale as you grow. All prices in USD — no hidden fees.</p>

        {/* Toggle switch */}
        <div className="inline-flex items-center gap-3 mb-14">
          <button
            type="button"
            onClick={() => setAnnual(false)}
            className={`text-sm font-bold transition-colors ${!annual ? 'text-[#0f172a]' : 'text-[#94958f]'}`}
          >
            Monthly
          </button>
          <Switch checked={annual} onCheckedChange={setAnnual} />
          <button
            type="button"
            onClick={() => setAnnual(true)}
            className={`text-sm font-bold transition-colors ${annual ? 'text-[#0f172a]' : 'text-[#94958f]'}`}
          >
            Annual
          </button>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#16a34a]">Save 12%</span>
        </div>
      </section>

      {/* Cards */}
      <div className="bg-[#eef0ee] pb-12 px-6">
        <div className="max-w-[1240px] mx-auto grid grid-cols-4 gap-4 items-start max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-3 max-[640px]:px-0">
          {plans.map(plan => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const hasPrice = price != null;
            // On annual, the amount actually charged is the full-year total — not
            // the "/mo" figure shown above it. Admin sends it exactly.
            const chargeAmount = annual ? plan.annualTotal ?? null : price;
            const trialDays = plan.trialDays ?? FALLBACK_TRIAL_DAYS;
            const isFeatured = plan.featured;
            const isEnterprise = plan.enterprise;

            const cardClass = [
              "rounded-[20px] overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5",
              isFeatured
                ? "bg-[#0f172a] shadow-[0_16px_40px_rgba(0,0,0,0.25)] -translate-y-1 hover:-translate-y-1.5 max-[1024px]:translate-y-0 max-[1024px]:hover:-translate-y-0.5"
                : "bg-white border border-[#e5e5e0] shadow-[0_2px_10px_rgba(15,23,42,0.04)]",
            ].join(' ');

            const nameClass = `text-base font-bold mb-1 ${isFeatured ? 'text-white' : 'text-[#0f172a]'}`;
            const taglineClass = `text-sm mb-4 leading-[1.5] ${isFeatured ? 'text-white/55' : 'text-[#64748b]'}`;
            const priceClass = `text-[32px] font-extrabold tracking-[-1px] ${isFeatured ? 'text-white' : 'text-[#0f172a]'}`;
            // The featured card flips its footer to white so the checklist stays
            // legible against the dark top zone, matching the reference layout.
            const footerClass = `p-6 pt-5 ${isFeatured ? 'bg-white' : 'bg-[#f4f4f2]'}`;
            const featureItemClass = "flex items-start gap-2.5 text-sm leading-[1.5] text-[#334155]";
            const checkClass = "w-4 h-4 flex items-center justify-center shrink-0 mt-0.5";
            const checkStroke = '#0f172a';
            const cardCtaClass = "block text-center px-5 py-[13px] rounded-full text-sm font-bold cursor-pointer transition-all duration-200 w-full no-underline bg-[#0D47A1] text-white hover:bg-[#0a3680]";

            return (
              <div key={plan.id} className={cardClass}>
                {/* Badge */}
                {plan.badge && (
                  <div className="text-[10px] font-extrabold tracking-[0.1em] uppercase text-center px-3 py-2 bg-black text-white">
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 pb-6">
                  <div className={nameClass}>{plan.name}</div>
                  <div className={taglineClass}>{plan.tagline}</div>

                  {/* Price */}
                  {plan.free ? (
                    <div className={`${priceClass} mb-4`}>Free</div>
                  ) : isEnterprise ? (
                    <div className={`${priceClass} mb-4`}>Custom</div>
                  ) : !hasPrice ? (
                    <div className={`${priceClass} mb-4`}>—</div>
                  ) : (
                    <>
                      <div className="flex items-end gap-0.5 leading-none">
                        <span className={`text-sm font-bold pb-1.5 ${isFeatured ? 'text-white/70' : 'text-[#0D47A1]'}`}>$</span>
                        <span className={priceClass}>{formatUsd(price)}</span>
                        <span className={`text-xs pb-1.5 ml-1 ${isFeatured ? 'text-white/50' : 'text-[#94a3b8]'}`}>/monthly</span>
                      </div>
                      <div className="text-xs font-semibold text-[#16a34a] mt-1 mb-4 min-h-[16px]">
                        {annual
                          ? `$${formatUsd(chargeAmount ?? price * 12)} billed annually`
                          : ' '}
                      </div>
                    </>
                  )}

                  {/* CTA */}
                  {plan.id === 'starter' ? (
                    <button
                      onClick={() => setShowStarterModal(true)}
                      className={cardCtaClass}>
                      {plan.cta}
                    </button>
                  ) : plan.ctaHref ? (
                    <a href={plan.ctaHref} className={cardCtaClass}>
                      {plan.cta}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setCheckoutPlan(plan)}
                        disabled={!hasPrice}
                        className={`${cardCtaClass} ${!hasPrice ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {hasPrice ? plan.cta : 'Pricing unavailable'}
                      </button>
                      {/* Stripe's trial takes a card but charges $0 today, so never
                          say "no credit card required" for a paid plan.
                          On annual we must name the FULL-YEAR amount: someone who
                          thinks they're trialling a $51.92 plan and then sees
                          $623.04 leave their account will dispute the charge. */}
                      {hasPrice && (
                        <p className={`text-xs text-center mt-2.5 leading-[1.5] ${isFeatured ? 'text-white/40' : 'text-[#94a3b8]'}`}>
                          {trialDays}-day free trial · card required · $0 today
                          {chargeAmount != null && (
                            <>
                              <br />
                              then <strong className={`font-bold ${isFeatured ? 'text-white/70' : 'text-[#64748b]'}`}>
                                ${formatUsd(chargeAmount)}
                              </strong>{annual ? ' for the full year' : '/mo'}
                              {firstChargeDate ? ` on ${firstChargeDate}` : ` on day ${trialDays}`}
                            </>
                          )}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Features */}
                <div className={footerClass}>
                  <ul className="list-none flex flex-col gap-2.5">
                    {plan.features.map(f => (
                      <li key={f} className={featureItemClass}>
                        <span className={checkClass}>
                          <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                            <polyline
                              points="1.5,5 4,7.5 8.5,2"
                              stroke={checkStroke}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap justify-center gap-6 px-6 py-9 max-w-[900px] mx-auto max-[640px]:gap-4 max-[640px]:px-5 max-[640px]:py-7">
        {[
          'No credit card for free plan',
          '14-day free trial — cancel anytime',
          'Enterprise-grade security',
          'Single-tenant hosted',
          'Stripe-secured checkout',
        ].map(text => (
          <div key={text} className="flex items-center gap-2 text-[13px] text-[#64748b] font-medium">
            <span className="w-5 h-5 rounded-full bg-[#EEF5FD] flex items-center justify-center shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polyline points="1.5,5 4,7.5 8.5,2" stroke="#0D47A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {text}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="max-w-[1080px] mx-auto px-6 pb-20 max-[640px]:px-4 max-[640px]:pb-[60px]">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-[#0D47A1] tracking-[-0.8px] mb-2 max-[640px]:text-[28px]">Compare all plans</h2>
          <p className="text-[15px] text-[#64748b]">Everything you need to choose the right tier for your team</p>
        </div>

        <div className="rounded-[20px] overflow-hidden border-[1.5px] border-[#e8edf5] bg-white max-[640px]:overflow-x-auto max-[640px]:[-webkit-overflow-scrolling:touch]">
          <table className="w-full border-collapse text-sm max-[640px]:min-w-[560px]">
            <thead>
              <tr className="bg-[#f8fafc]">
                <th className="px-5 py-4 font-bold text-center border-b-[1.5px] border-[#e8edf5] text-left !text-[#94a3b8] text-xs font-semibold tracking-[0.05em] uppercase"></th>
                {plans.map(p => (
                  <th key={p.id} className={`px-5 py-4 font-bold text-center border-b-[1.5px] border-[#e8edf5] ${p.featured ? '!text-[#0D47A1] !bg-[#EEF5FD]' : ''}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(([label, ...vals]) => (
                <tr key={label} className="group">
                  <td className="px-5 py-3.5 text-center text-[#475569] border-b border-[#f1f5f9] last:border-b-0 group-hover:bg-[#f8fafc] text-left !text-[#0f172a] font-semibold">{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={`px-5 py-3.5 text-center border-b border-[#f1f5f9] last:border-b-0 group-hover:bg-[#f8fafc] ${v === '—' ? 'text-[#cbd5e1]' : 'text-[#475569]'}`}>
                      {v === '✓' ? <CheckCircle size={18} weight="duotone" color="#16a34a" className="inline-block" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paid checkout modal */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          annual={annual}
          onClose={() => setCheckoutPlan(null)}
        />
      )}

      {/* Starter free signup modal */}
      {showStarterModal && (
        <StarterSignupModal onClose={() => setShowStarterModal(false)} />
      )}
    </>
  );
}
