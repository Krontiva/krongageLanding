'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { formatUsd } from '@/src/lib/format-price';

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
      <style>{`
        /* ─── Hero ─── */
        .pg-hero {
          background: #f0f7ff;
          text-align: center;
          padding: 80px 24px 56px;
        }
        .pg-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0D47A1;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 50px;
          margin-bottom: 24px;
        }
        .pg-h1 {
          font-size: 52px;
          font-weight: 800;
          color: #0D47A1;
          line-height: 1.08;
          letter-spacing: -1.5px;
          margin-bottom: 16px;
        }
        .pg-sub {
          font-size: 17px;
          color: #475569;
          line-height: 1.75;
          max-width: 480px;
          margin: 0 auto 40px;
        }

        /* ─── Toggle ─── */
        .pg-toggle-wrap {
          display: inline-flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 50px;
          padding: 4px;
          box-shadow: 0 2px 8px rgba(13,71,161,.07);
        }
        .pg-toggle-btn {
          padding: 10px 28px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all .2s;
          background: transparent;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pg-toggle-btn.active {
          background: #0D47A1;
          color: #fff;
          box-shadow: 0 2px 10px rgba(13,71,161,.25);
        }
        .pg-save-badge {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 50px;
          background: #dcfce7;
          color: #16a34a;
        }
        .pg-toggle-btn.active .pg-save-badge {
          background: rgba(255,255,255,.2);
          color: #fff;
        }

        /* ─── Cards grid ─── */
        .pg-cards-outer {
          padding: 48px 24px 0;
          max-width: 1240px;
          margin: 0 auto;
        }
        .pg-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          align-items: start;
        }
        .pg-card {
          background: #fff;
          border: 1.5px solid #e8edf5;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow .2s, transform .2s;
        }
        .pg-card:hover {
          box-shadow: 0 12px 40px rgba(13,71,161,.1);
          transform: translateY(-2px);
        }
        .pg-card.pg-featured {
          background: #0D47A1;
          border-color: #0D47A1;
          box-shadow: 0 16px 56px rgba(13,71,161,.28);
          transform: translateY(-8px);
        }
        .pg-card.pg-featured:hover {
          transform: translateY(-12px);
          box-shadow: 0 24px 64px rgba(13,71,161,.35);
        }
        .pg-card.pg-enterprise {
          background: #0f172a;
          border-color: #0f172a;
        }

        /* ─── Card badge ─── */
        .pg-badge {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          text-align: center;
          padding: 8px 12px;
          background: rgba(255,255,255,.15);
          color: #fff;
        }
        .pg-badge-blue {
          background: #fff;
          color: #0D47A1;
        }

        /* ─── Card body ─── */
        .pg-card-body {
          padding: 24px 22px 22px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .pg-plan-name {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #0D47A1;
          margin-bottom: 4px;
        }
        .pg-featured .pg-plan-name,
        .pg-enterprise .pg-plan-name {
          color: rgba(255,255,255,.65);
        }
        .pg-tagline {
          font-size: 13px;
          color: #64748b;
          margin-bottom: 20px;
          line-height: 1.5;
        }
        .pg-featured .pg-tagline,
        .pg-enterprise .pg-tagline {
          color: rgba(255,255,255,.55);
        }

        /* ─── Price ─── */
        .pg-price-row {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          margin-bottom: 4px;
          line-height: 1;
        }
        .pg-price-dollar {
          font-size: 20px;
          font-weight: 800;
          color: #0f172a;
          padding-bottom: 4px;
        }
        .pg-featured .pg-price-dollar,
        .pg-enterprise .pg-price-dollar {
          color: #fff;
        }
        .pg-price-amount {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -2px;
        }
        .pg-featured .pg-price-amount,
        .pg-enterprise .pg-price-amount {
          color: #fff;
        }
        .pg-price-mo {
          font-size: 14px;
          color: #94a3b8;
          padding-bottom: 6px;
        }
        .pg-featured .pg-price-mo,
        .pg-enterprise .pg-price-mo {
          color: rgba(255,255,255,.5);
        }
        .pg-price-annual {
          font-size: 12px;
          color: #16a34a;
          font-weight: 600;
          margin-bottom: 20px;
          min-height: 18px;
        }
        .pg-featured .pg-price-annual {
          color: #86efac;
        }
        .pg-price-custom {
          font-size: 44px;
          font-weight: 800;
          color: #fff;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }
        .pg-price-free {
          font-size: 44px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }

        /* ─── Divider ─── */
        .pg-divider {
          height: 1px;
          background: #f1f5f9;
          margin-bottom: 20px;
        }
        .pg-featured .pg-divider,
        .pg-enterprise .pg-divider {
          background: rgba(255,255,255,.12);
        }

        /* ─── Features list ─── */
        .pg-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 24px;
          flex: 1;
        }
        .pg-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: #475569;
          line-height: 1.5;
        }
        .pg-featured .pg-feature-item,
        .pg-enterprise .pg-feature-item {
          color: rgba(255,255,255,.8);
        }
        .pg-check {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #EEF5FD;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .pg-check svg { width: 10px; height: 10px; }
        .pg-check-stroke { stroke: #0D47A1; }
        .pg-featured .pg-check {
          background: rgba(255,255,255,.18);
        }
        .pg-featured .pg-check-stroke { stroke: #fff; }
        .pg-enterprise .pg-check {
          background: rgba(255,255,255,.1);
        }
        .pg-enterprise .pg-check-stroke { stroke: rgba(255,255,255,.7); }

        /* ─── CTAs ─── */
        .pg-cta-primary {
          display: block;
          text-align: center;
          padding: 13px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all .2s;
          border: 2px solid transparent;
          width: 100%;
          text-decoration: none;
        }
        .pg-cta-ghost {
          background: transparent;
          color: #0D47A1;
          border-color: #cbd5e1;
        }
        .pg-cta-ghost:hover {
          border-color: #0D47A1;
          background: #EEF5FD;
        }
        .pg-cta-blue {
          background: #fff;
          color: #0D47A1;
          border-color: #fff;
        }
        .pg-cta-blue:hover {
          background: transparent;
          color: #fff;
          border-color: #fff;
        }
        .pg-cta-dark {
          background: transparent;
          color: #fff;
          border-color: rgba(255,255,255,.3);
        }
        .pg-cta-dark:hover {
          background: rgba(255,255,255,.1);
          border-color: rgba(255,255,255,.6);
        }
        .pg-cta-outline {
          background: #0D47A1;
          color: #fff;
          border-color: #0D47A1;
        }
        .pg-cta-outline:hover { background: #0a3680; border-color: #0a3680; }

        /* ─── Trust row ─── */
        .pg-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          padding: 36px 24px;
          max-width: 900px;
          margin: 0 auto;
        }
        .pg-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }
        .pg-trust-dot {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #EEF5FD;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ─── Comparison ─── */
        .pg-compare-outer {
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .pg-compare-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .pg-compare-header h2 {
          font-size: 36px;
          font-weight: 800;
          color: #0D47A1;
          letter-spacing: -.8px;
          margin-bottom: 8px;
        }
        .pg-compare-header p {
          font-size: 15px;
          color: #64748b;
        }
        .pg-table-wrap {
          border-radius: 20px;
          overflow: hidden;
          border: 1.5px solid #e8edf5;
          background: #fff;
        }
        .pg-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .pg-table thead tr {
          background: #f8fafc;
        }
        .pg-table th {
          padding: 16px 20px;
          font-weight: 700;
          text-align: center;
          border-bottom: 1.5px solid #e8edf5;
        }
        .pg-table th:first-child {
          text-align: left;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .05em;
          text-transform: uppercase;
        }
        .pg-table td {
          padding: 14px 20px;
          text-align: center;
          color: #475569;
          border-bottom: 1px solid #f1f5f9;
        }
        .pg-table td:first-child {
          text-align: left;
          color: #0f172a;
          font-weight: 600;
        }
        .pg-table tbody tr:last-child td {
          border-bottom: none;
        }
        .pg-table tbody tr:hover td {
          background: #f8fafc;
        }
        .pg-table td.pg-td-dash {
          color: #cbd5e1;
        }
        .pg-th-featured {
          color: #0D47A1 !important;
          background: #EEF5FD;
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .pg-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .pg-card.pg-featured {
            transform: none;
          }
          .pg-card.pg-featured:hover {
            transform: translateY(-2px);
          }
          .pg-h1 { font-size: 40px; }
        }
        @media (max-width: 640px) {
          .pg-hero { padding: 56px 20px 40px; }
          .pg-h1 { font-size: 34px; letter-spacing: -.5px; }
          .pg-sub { font-size: 15px; }
          .pg-cards { grid-template-columns: 1fr; gap: 12px; }
          .pg-cards-outer { padding: 32px 16px 0; }
          .pg-toggle-btn { padding: 9px 18px; font-size: 13px; }
          .pg-compare-outer { padding: 0 16px 60px; }
          .pg-compare-header h2 { font-size: 28px; }
          .pg-table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          .pg-table { min-width: 560px; }
          .pg-trust { gap: 16px; padding: 28px 20px; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="pg-hero">
        <div className="pg-eyebrow">Simple, Transparent Pricing</div>
        <h1 className="pg-h1">Plans that grow<br />with your team</h1>
        <p className="pg-sub">Start free. Scale as you grow. All prices in USD — no hidden fees.</p>

        {/* Toggle */}
        <div className="pg-toggle-wrap">
          <button
            className={`pg-toggle-btn${!annual ? ' active' : ''}`}
            onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button
            className={`pg-toggle-btn${annual ? ' active' : ''}`}
            onClick={() => setAnnual(true)}>
            Annual
            <span className="pg-save-badge">Save 12%</span>
          </button>
        </div>
      </section>

      {/* ── Cards ── */}
      <div className="pg-cards-outer">
        <div className="pg-cards">
          {plans.map(plan => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            const hasPrice = price != null;
            // On annual, the amount actually charged is the full-year total — not
            // the "/mo" figure shown above it. Admin sends it exactly.
            const chargeAmount = annual ? plan.annualTotal ?? null : price;
            const trialDays = plan.trialDays ?? FALLBACK_TRIAL_DAYS;
            const isFeatured = plan.featured;
            const isEnterprise = plan.enterprise;
            const cardClass = `pg-card${isFeatured ? ' pg-featured' : ''}${isEnterprise ? ' pg-enterprise' : ''}`;

            return (
              <div key={plan.id} className={cardClass}>
                {/* Badge */}
                {plan.badge && (
                  <div className={`pg-badge${isFeatured ? ' pg-badge-blue' : ''}`}>
                    {plan.badge}
                  </div>
                )}

                <div className="pg-card-body">
                  {/* Plan name + tagline */}
                  <div className="pg-plan-name">{plan.name}</div>
                  <div className="pg-tagline">{plan.tagline}</div>

                  {/* Price */}
                  {plan.free ? (
                    <div className="pg-price-free">Free</div>
                  ) : isEnterprise ? (
                    <div className="pg-price-custom">Custom</div>
                  ) : !hasPrice ? (
                    <div className="pg-price-free">—</div>
                  ) : (
                    <>
                      <div className="pg-price-row">
                        <span className="pg-price-dollar">$</span>
                        <span className="pg-price-amount">{formatUsd(price)}</span>
                        <span className="pg-price-mo">/mo</span>
                      </div>
                      <div className="pg-price-annual">
                        {annual
                          ? `$${formatUsd(chargeAmount ?? price * 12)} billed annually`
                          : ' '}
                      </div>
                    </>
                  )}

                  <div className="pg-divider" />

                  {/* Features */}
                  <ul className="pg-features">
                    {plan.features.map(f => (
                      <li key={f} className="pg-feature-item">
                        <span className="pg-check">
                          <svg viewBox="0 0 10 10" fill="none">
                            <polyline
                              points="1.5,5 4,7.5 8.5,2"
                              className="pg-check-stroke"
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
                      className="pg-cta-primary pg-cta-ghost">
                      {plan.cta}
                    </button>
                  ) : plan.ctaHref ? (
                    <a
                      href={plan.ctaHref}
                      className={`pg-cta-primary ${
                        isFeatured ? 'pg-cta-blue' :
                        isEnterprise ? 'pg-cta-dark' :
                        'pg-cta-ghost'
                      }`}>
                      {plan.cta}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setCheckoutPlan(plan)}
                        disabled={!hasPrice}
                        style={!hasPrice ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                        className={`pg-cta-primary ${isFeatured ? 'pg-cta-blue' : 'pg-cta-outline'}`}>
                        {hasPrice ? plan.cta : 'Pricing unavailable'}
                      </button>
                      {/* Stripe's trial takes a card but charges $0 today, so never
                          say "no credit card required" for a paid plan.
                          On annual we must name the FULL-YEAR amount: someone who
                          thinks they're trialling a $51.92 plan and then sees
                          $623.04 leave their account will dispute the charge. */}
                      {hasPrice && (
                        <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', marginTop: '10px', lineHeight: 1.5 }}>
                          {trialDays}-day free trial · card required · $0 today
                          {chargeAmount != null && (
                            <>
                              <br />
                              then <strong style={{ color: '#64748b', fontWeight: 700 }}>
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

      {/* ── Trust row ── */}
      <div className="pg-trust">
        {[
          ['✓', 'No credit card for free plan'],
          ['✓', '14-day free trial — cancel anytime'],
          ['✓', 'Enterprise-grade security'],
          ['✓', 'Single-tenant hosted'],
          ['✓', 'Stripe-secured checkout'],
        ].map(([icon, text]) => (
          <div key={text} className="pg-trust-item">
            <span className="pg-trust-dot">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <polyline points="1.5,5 4,7.5 8.5,2" stroke="#0D47A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {text}
          </div>
        ))}
      </div>

      {/* ── Comparison table ── */}
      <div className="pg-compare-outer">
        <div className="pg-compare-header">
          <h2>Compare all plans</h2>
          <p>Everything you need to choose the right tier for your team</p>
        </div>

        <div className="pg-table-wrap">
          <table className="pg-table">
            <thead>
              <tr>
                <th></th>
                {plans.map(p => (
                  <th key={p.id} className={p.featured ? 'pg-th-featured' : ''}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map(([label, ...vals]) => (
                <tr key={label}>
                  <td>{label}</td>
                  {vals.map((v, i) => (
                    <td key={i} className={v === '—' ? 'pg-td-dash' : ''}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Paid checkout modal ── */}
      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          annual={annual}
          onClose={() => setCheckoutPlan(null)}
        />
      )}

      {/* ── Starter free signup modal ── */}
      {showStarterModal && (
        <StarterSignupModal onClose={() => setShowStarterModal(false)} />
      )}
    </>
  );
}
