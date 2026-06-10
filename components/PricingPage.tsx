'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PaystackCheckout = dynamic(() => import('./PaystackCheckout'), { ssr: false });

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Get started at no cost',
    monthlyPrice: 0,
    currency: 'USD',
    color: '#64748b',
    badge: null,
    deployment: 'Hosted',
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
    cta: 'Get Started Free',
    highlight: false,
    free: true,
    enterprise: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    monthlyPrice: 5000,
    currency: 'USD',
    color: '#0D47A1',
    badge: 'Most Popular',
    deployment: 'Hosted · Paystack',
    features: [
      '5 team members · 3 channels',
      'KronChat (WhatsApp, SMS, Social DMs)',
      'Social Publishing — 5 accounts',
      'KronCampaign — 5,000 contacts (Email + SMS)',
      'Full AI Workflows + AI Studio',
      'Social Listening (lite)',
      '10,000 AI requests / month',
      'Standard analytics + CSAT',
      'Email support · Self-serve onboarding',
    ],
    cta: 'Start Growth Plan',
    highlight: true,
    free: false,
    enterprise: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For established businesses',
    monthlyPrice: 6000,
    currency: 'USD',
    color: '#7c3aed',
    badge: null,
    deployment: 'Hosted · Paystack',
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
    cta: 'Start Professional Plan',
    highlight: false,
    free: false,
    enterprise: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'On-prem for large organisations',
    monthlyPrice: null,
    currency: 'USD',
    color: '#0f172a',
    badge: 'On-Premise',
    deployment: 'Self-hosted · Bank billing',
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
    cta: 'Contact Sales',
    highlight: false,
    free: false,
    enterprise: true,
  },
];

export default function PricingPage() {
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS[0] | null>(null);

  return (
    <div style={{ fontFamily: 'Manrope, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="text-center pt-20 pb-12 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0D47A1] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          Simple, Transparent Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          Plans that grow<br />with your team
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Start free. Scale as you grow. Billed monthly via Paystack.
        </p>
      </section>

      {/* Cards */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map(plan => (
            <div key={plan.id}
              className={`relative bg-white rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-xl ${
                plan.highlight ? 'border-[#0D47A1] shadow-lg shadow-blue-100' : 'border-slate-200'
              }`}>

              {/* Top badge */}
              {plan.badge && (
                <div className={`text-white text-[11px] font-bold text-center py-2 tracking-wider uppercase ${
                  plan.enterprise ? 'bg-slate-800' : 'bg-[#0D47A1]'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: plan.color }}>{plan.name}</div>
                  <div className="text-sm text-slate-400 mb-4">{plan.tagline}</div>

                  {plan.enterprise ? (
                    <div className="text-3xl font-extrabold text-slate-900">Custom</div>
                  ) : plan.free ? (
                    <div className="text-3xl font-extrabold text-slate-900">Free</div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        ${plan.monthlyPrice!.toLocaleString()}
                      </span>
                      <span className="text-slate-400 text-sm mb-1">/mo</span>
                    </div>
                  )}

                  <div className="text-xs text-slate-400 mt-1.5">{plan.deployment}</div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: plan.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.enterprise ? (
                  <a href="/contact"
                    className="block text-center border-2 border-slate-800 text-slate-800 font-bold py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all text-sm">
                    {plan.cta}
                  </a>
                ) : plan.free ? (
                  <a href="/contact"
                    className="block text-center border-2 border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:border-[#0D47A1] hover:text-[#0D47A1] transition-all text-sm">
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => setCheckoutPlan(plan)}
                    className="w-full font-bold py-3 rounded-xl transition-all text-sm text-white hover:opacity-90"
                    style={{ background: plan.color }}>
                    {plan.cta}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm text-slate-400">
          {[
            'No credit card for free plan',
            'Enterprise-grade security',
            'Cancel anytime',
            'Single-tenant hosted',
            'Paystack-secured checkout',
          ].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-[#0D47A1]">✓</span> {t}
            </span>
          ))}
        </div>

        {/* Feature comparison teaser */}
        <div className="mt-16 bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-extrabold text-slate-900">Plan comparison</h2>
            <p className="text-sm text-slate-400 mt-0.5">Key limits across all tiers</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-6 py-3 font-bold text-slate-600 w-48">Feature</th>
                  {PLANS.map(p => (
                    <th key={p.id} className="px-4 py-3 font-bold text-center"
                      style={{ color: p.color }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Team members', '2', '5', '10', 'Unlimited'],
                  ['Messaging channels', '1', '3', '10', 'Unlimited'],
                  ['Storage', '100 MB', '1 GB', '10 GB', 'Custom'],
                  ['AI requests / mo', '1,000', '10,000', '100,000', 'Custom'],
                  ['KronChat Captain AI / mo', '100 msgs', '1,000 msgs', '10,000 msgs', '500K+'],
                  ['KronCampaign contacts', '500', '5,000', '50,000', 'Custom'],
                  ['Social accounts', '2', '5', '15', 'Unlimited'],
                  ['Customer 360 (CDP)', '—', '—', 'Lite', 'Full'],
                  ['Social Listening', '—', 'Lite', 'Lite', 'Enterprise'],
                  ['Knowledge / RAG', '—', '—', 'Lite', 'Enterprise'],
                  ['Uptime SLA', '—', '—', '99.9%', 'Custom'],
                  ['Support', 'Community', 'Email', 'Priority', 'Dedicated CSM'],
                ].map(([label, ...vals]) => (
                  <tr key={label} className="border-t border-slate-50 hover:bg-slate-50/50">
                    <td className="px-6 py-3 text-slate-700 font-medium">{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={`px-4 py-3 text-center ${
                        v === '—' ? 'text-slate-300' : 'text-slate-700'
                      }`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Checkout modal */}
      {checkoutPlan && (
        <PaystackCheckout
          plan={checkoutPlan}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}
