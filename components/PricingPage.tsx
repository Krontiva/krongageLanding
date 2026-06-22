'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PaystackCheckout   = dynamic(() => import('./PaystackCheckout'),   { ssr: false });
const StarterSignupModal = dynamic(() => import('./StarterSignupModal'),  { ssr: false });

const PLANS = [
  {
    id: 'starter',
    name: 'Free',
    tagline: 'Get started at no cost',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: 'USD',
    badge: null,
    featured: false,
    free: true,
    enterprise: false,
    cta: 'Get Started Free',
    ctaHref: '/contact',
    features: [
      '2 team members · 1 channel',
      'KronChat (live chat + email)',
      'Social Publishing — 2 accounts',
      'KronCampaign — 500 contacts',
      'Basic AI Workflows',
      '1,000 AI requests / month',
      'Basic analytics',
      'Community support',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    monthlyPrice: 5000,
    annualPrice: 4400,
    currency: 'USD',
    badge: 'Most Popular',
    featured: true,
    free: false,
    enterprise: false,
    cta: 'Start Growth Plan',
    ctaHref: null,
    features: [
      '5 team members · 3 channels',
      'KronChat (WhatsApp, SMS, Social DMs)',
      'Social Publishing — 5 accounts',
      'KronCampaign — 5,000 contacts',
      'Full AI Workflows + AI Studio',
      'Social Listening (lite)',
      '10,000 AI requests / month',
      'Standard analytics + CSAT',
      'Email support · Self-serve onboarding',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For established businesses',
    monthlyPrice: 6000,
    annualPrice: 5280,
    currency: 'USD',
    badge: null,
    featured: false,
    free: false,
    enterprise: false,
    cta: 'Start Professional Plan',
    ctaHref: null,
    features: [
      '10 team members · 10 channels',
      'All Growth features',
      'Customer 360 CDP (unified profiles)',
      'KronCampaign — 50,000 contacts + WhatsApp',
      'Knowledge / RAG (lite)',
      'Advanced analytics + downloadable reports',
      'SLA policies · 99.9% uptime',
      '100,000 AI requests / month',
      'Priority support · Guided onboarding',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'On-prem for large organisations',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    badge: 'On-Premise',
    featured: false,
    free: false,
    enterprise: true,
    cta: 'Contact Sales',
    ctaHref: '/contact',
    features: [
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
  ['Team members',        '2',       '5',       '10',      'Unlimited'],
  ['Messaging channels',  '1',       '3',       '10',      'Unlimited'],
  ['Storage',             '100 MB',  '1 GB',    '10 GB',   'Custom'],
  ['AI requests / mo',    '1,000',   '10,000',  '100,000', 'Custom'],
  ['KronChat Captain AI', '100 msgs','1,000 msgs','10,000 msgs','500K+'],
  ['Campaign contacts',   '500',     '5,000',   '50,000',  'Custom'],
  ['Social accounts',     '2',       '5',       '15',      'Unlimited'],
  ['Customer 360 CDP',    '—',       '—',       'Lite',    'Full'],
  ['Social Listening',    '—',       'Lite',    'Lite',    'Enterprise'],
  ['Knowledge / RAG',     '—',       '—',       'Lite',    'Enterprise'],
  ['Uptime SLA',          '—',       '—',       '99.9%',   'Custom'],
  ['Support',             'Community','Email',  'Priority', 'Dedicated CSM'],
];

export default function PricingPage() {
  const [annual, setAnnual]               = useState(false);
  const [checkoutPlan, setCheckoutPlan]   = useState<typeof PLANS[0] | null>(null);
  const [showStarterModal, setShowStarterModal] = useState(false);

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
        <p className="pg-sub">Start free. Scale as you grow. Billed monthly via Paystack — no hidden fees.</p>

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
          {PLANS.map(plan => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
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
                  ) : (
                    <>
                      <div className="pg-price-row">
                        <span className="pg-price-dollar">$</span>
                        <span className="pg-price-amount">{price!.toLocaleString()}</span>
                        <span className="pg-price-mo">/mo</span>
                      </div>
                      <div className="pg-price-annual">
                        {annual
                          ? `$${(price! * 12).toLocaleString()} billed annually`
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
                    <button
                      onClick={() => setCheckoutPlan(plan)}
                      className={`pg-cta-primary ${isFeatured ? 'pg-cta-blue' : 'pg-cta-outline'}`}>
                      {plan.cta}
                    </button>
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
          ['✓', 'Enterprise-grade security'],
          ['✓', 'Cancel anytime'],
          ['✓', 'Single-tenant hosted'],
          ['✓', 'Paystack-secured checkout'],
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
                {PLANS.map(p => (
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
        <PaystackCheckout
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
