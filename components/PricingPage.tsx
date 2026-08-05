'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { formatUsd } from '@/src/lib/format-price';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

const ctaBaseClass = "block text-center px-5 py-[13px] rounded-full text-sm font-bold cursor-pointer transition-all duration-200 border-2 border-transparent w-full no-underline";
const ctaGhost = "bg-transparent text-[#0D47A1] border-[#cbd5e1] hover:border-[#0D47A1] hover:bg-[#EEF5FD]";
const ctaBlue = "bg-white text-[#0D47A1] border-white hover:bg-transparent hover:text-white";
const ctaDark = "bg-transparent text-white border-white/30 hover:bg-white/10 hover:border-white/60";
const ctaOutline = "bg-[#0D47A1] text-white border-[#0D47A1] hover:bg-[#0a3680] hover:border-[#0a3680]";

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
      <section className="bg-[#f0f7ff] text-center px-6 pt-[148px] pb-14 max-[640px]:px-5 max-[640px]:pt-[124px] max-[640px]:pb-10">
        <div className="inline-flex items-center gap-2 bg-[#0D47A1] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-[18px] py-1.5 rounded-full mb-6">Simple, Transparent Pricing</div>
        <h1 className="text-[52px] font-extrabold text-[#0D47A1] leading-[1.08] tracking-[-1.5px] mb-4 max-[1024px]:text-[40px] max-[640px]:text-[34px] max-[640px]:tracking-[-0.5px]">Plans that grow<br />with your team</h1>
        <p className="text-[17px] text-[#475569] leading-[1.75] max-w-[480px] mx-auto mb-10 max-[640px]:text-[15px]">Start free. Scale as you grow. All prices in USD — no hidden fees.</p>

        {/* Toggle */}
        <Tabs value={annual ? 'annual' : 'monthly'} onValueChange={v => setAnnual(v === 'annual')}>
          <TabsList className="!bg-white !border-[1.5px] !border-[#e2e8f0] !rounded-full !p-1 !h-auto !shadow-[0_2px_8px_rgba(13,71,161,0.07)] !gap-0">
            <TabsTrigger
              value="monthly"
              className="!rounded-full !px-7 !py-2.5 !text-sm !font-bold !text-[#64748b] max-sm:!px-[18px] max-sm:!text-[13px] data-[state=active]:!bg-[#0D47A1] data-[state=active]:!text-white data-[state=active]:!shadow-[0_2px_10px_rgba(13,71,161,0.25)]"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger
              value="annual"
              className="!rounded-full !px-7 !py-2.5 !text-sm !font-bold !text-[#64748b] !gap-2 max-sm:!px-[18px] max-sm:!text-[13px] data-[state=active]:!bg-[#0D47A1] data-[state=active]:!text-white data-[state=active]:!shadow-[0_2px_10px_rgba(13,71,161,0.25)]"
            >
              Annual
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: annual ? 'rgba(255,255,255,.2)' : '#dcfce7',
                  color: annual ? '#fff' : '#16a34a',
                }}
              >
                Save 12%
              </span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      {/* Cards */}
      <div className="pt-12 px-6 max-w-[1240px] mx-auto max-[640px]:pt-8 max-[640px]:px-4">
        <div className="grid grid-cols-4 gap-4 items-start max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-3">
          {plans.map(plan => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const hasPrice = price != null;
            // On annual, the amount actually charged is the full-year total — not
            // the "/mo" figure shown above it. Admin sends it exactly.
            const chargeAmount = annual ? plan.annualTotal ?? null : price;
            const trialDays = plan.trialDays ?? FALLBACK_TRIAL_DAYS;
            const isFeatured = plan.featured;
            const isEnterprise = plan.enterprise;
            const isDark = isFeatured || isEnterprise;

            const cardClass = [
              "bg-white border-[1.5px] border-[#e8edf5] rounded-[20px] overflow-hidden flex flex-col transition-[box-shadow,transform] duration-200 hover:shadow-[0_12px_40px_rgba(13,71,161,0.1)] hover:-translate-y-0.5",
              isFeatured && "!bg-[#0D47A1] !border-[#0D47A1] shadow-[0_16px_56px_rgba(13,71,161,0.28)] -translate-y-2 hover:-translate-y-3 hover:shadow-[0_24px_64px_rgba(13,71,161,0.35)] max-[1024px]:translate-y-0 max-[1024px]:hover:-translate-y-0.5",
              isEnterprise && "!bg-[#0f172a] !border-[#0f172a]",
            ].filter(Boolean).join(' ');

            const nameClass = `text-[11px] font-extrabold tracking-[0.1em] uppercase mb-1 ${isDark ? 'text-white/65' : 'text-[#0D47A1]'}`;
            const taglineClass = `text-[13px] mb-5 leading-[1.5] ${isDark ? 'text-white/55' : 'text-[#64748b]'}`;
            const dividerClass = `h-px mb-5 ${isDark ? 'bg-white/[0.12]' : 'bg-[#f1f5f9]'}`;
            const featureItemClass = `flex items-start gap-2.5 text-[13px] leading-[1.5] ${isDark ? 'text-white/80' : 'text-[#475569]'}`;
            const checkClass = `w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 mt-px ${isFeatured ? 'bg-white/[0.18]' : isEnterprise ? 'bg-white/10' : 'bg-[#EEF5FD]'}`;
            const checkStroke = isFeatured ? '#fff' : isEnterprise ? 'rgba(255,255,255,.7)' : '#0D47A1';

            return (
              <div key={plan.id} className={cardClass}>
                {/* Badge */}
                {plan.badge && (
                  <div className={`text-[10px] font-extrabold tracking-[0.1em] uppercase text-center px-3 py-2 ${isFeatured ? 'bg-white text-[#0D47A1]' : 'bg-white/15 text-white'}`}>
                    {plan.badge}
                  </div>
                )}

                <div className="pt-6 px-[22px] pb-[22px] flex-1 flex flex-col">
                  {/* Plan name + tagline */}
                  <div className={nameClass}>{plan.name}</div>
                  <div className={taglineClass}>{plan.tagline}</div>

                  {/* Price */}
                  {plan.free ? (
                    <div className="text-[44px] font-extrabold text-[#0f172a] tracking-[-2px] mb-6">Free</div>
                  ) : isEnterprise ? (
                    <div className="text-[44px] font-extrabold text-white tracking-[-2px] mb-6">Custom</div>
                  ) : !hasPrice ? (
                    <div className="text-[44px] font-extrabold text-[#0f172a] tracking-[-2px] mb-6">—</div>
                  ) : (
                    <>
                      <div className="flex items-end gap-1 mb-1 leading-none">
                        <span className={`text-xl font-extrabold pb-1 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>$</span>
                        <span className={`text-[44px] font-extrabold tracking-[-2px] ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{formatUsd(price)}</span>
                        <span className={`text-sm pb-1.5 ${isDark ? 'text-white/50' : 'text-[#94a3b8]'}`}>/mo</span>
                      </div>
                      <div className={`text-xs font-semibold mb-5 min-h-[18px] ${isFeatured ? 'text-[#86efac]' : 'text-[#16a34a]'}`}>
                        {annual
                          ? `$${formatUsd(chargeAmount ?? price * 12)} billed annually`
                          : ' '}
                      </div>
                    </>
                  )}

                  <div className={dividerClass} />

                  {/* Features */}
                  <ul className="list-none flex flex-col gap-2.5 mb-6 flex-1">
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

                  {/* CTA */}
                  {plan.id === 'starter' ? (
                    <button
                      onClick={() => setShowStarterModal(true)}
                      className={`${ctaBaseClass} ${ctaGhost}`}>
                      {plan.cta}
                    </button>
                  ) : plan.ctaHref ? (
                    <a
                      href={plan.ctaHref}
                      className={`${ctaBaseClass} ${
                        isFeatured ? ctaBlue :
                        isEnterprise ? ctaDark :
                        ctaGhost
                      }`}>
                      {plan.cta}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setCheckoutPlan(plan)}
                        disabled={!hasPrice}
                        className={`${ctaBaseClass} ${isFeatured ? ctaBlue : ctaOutline} ${!hasPrice ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {hasPrice ? plan.cta : 'Pricing unavailable'}
                      </button>
                      {/* Stripe's trial takes a card but charges $0 today, so never
                          say "no credit card required" for a paid plan.
                          On annual we must name the FULL-YEAR amount: someone who
                          thinks they're trialling a $51.92 plan and then sees
                          $623.04 leave their account will dispute the charge. */}
                      {hasPrice && (
                        <p className="text-xs text-[#94a3b8] text-center mt-2.5 leading-[1.5]">
                          {trialDays}-day free trial · card required · $0 today
                          {chargeAmount != null && (
                            <>
                              <br />
                              then <strong className="text-[#64748b] font-bold">
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust row */}
      <div className="flex flex-wrap justify-center gap-6 px-6 py-9 max-w-[900px] mx-auto max-[640px]:gap-4 max-[640px]:px-5 max-[640px]:py-7">
        {[
          ['✓', 'No credit card for free plan'],
          ['✓', '14-day free trial — cancel anytime'],
          ['✓', 'Enterprise-grade security'],
          ['✓', 'Single-tenant hosted'],
          ['✓', 'Stripe-secured checkout'],
        ].map(([icon, text]) => (
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
                      {v}
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
