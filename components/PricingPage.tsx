'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const PaystackCheckout = dynamic(() => import('./PaystackCheckout'), { ssr: false });

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    tagline: 'For teams getting started',
    monthlyPrice: 0,
    annualPrice: 0,
    currency: 'USD',
    color: '#64748b',
    features: [
      'Up to 2 users',
      '1,000 customer records',
      'Omnichannel inbox (2 channels)',
      'Basic campaign templates',
      'Community support',
    ],
    cta: 'Get Started Free',
    highlight: false,
    free: true,
  },
  {
    id: 'growth',
    name: 'Growth',
    tagline: 'For growing teams',
    monthlyPrice: 299,
    annualPrice: 249,
    currency: 'USD',
    color: '#0D47A1',
    features: [
      'Up to 10 users',
      '50,000 customer records',
      'All channels (WhatsApp, SMS, Email, Social)',
      'AI-powered automation flows',
      'Campaign management',
      'Analytics dashboard',
      'Customer 360 profiles',
      'Priority support',
    ],
    cta: 'Start Growth Plan',
    highlight: true,
    free: false,
  },
  {
    id: 'scale',
    name: 'Scale',
    tagline: 'For established businesses',
    monthlyPrice: 799,
    annualPrice: 666,
    currency: 'USD',
    color: '#7c3aed',
    features: [
      'Unlimited users',
      '500,000 customer records',
      'All Growth features',
      'Advanced AI diagnostics',
      'Social intelligence & listening',
      'Custom integrations',
      'Dedicated success manager',
      'SLA 99.9% uptime',
    ],
    cta: 'Start Scale Plan',
    highlight: false,
    free: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom for large organisations',
    monthlyPrice: null,
    annualPrice: null,
    currency: 'USD',
    color: '#0f172a',
    features: [
      'Unlimited everything',
      'On-premise or private cloud',
      'Custom AI model training',
      'Advanced security & compliance',
      'White-label options',
      'Custom SLA',
      'Dedicated engineering support',
    ],
    cta: 'Contact Sales',
    highlight: false,
    free: false,
    enterprise: true,
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<typeof PLANS[0] | null>(null);

  return (
    <div style={{ fontFamily: 'Manrope, system-ui, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="text-center pt-20 pb-12 px-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0D47A1] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
          ⊕ Simple, Transparent Pricing
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
          Plans that grow<br />with your team
        </h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10">
          Start free. Scale as you grow. No hidden fees, no lock-in.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-full p-1.5">
          <button
            onClick={() => setAnnual(false)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              !annual ? 'bg-[#0D47A1] text-white shadow-sm' : 'text-slate-500'
            }`}>
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              annual ? 'bg-[#0D47A1] text-white shadow-sm' : 'text-slate-500'
            }`}>
            Annual
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              annual ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
            }`}>Save 17%</span>
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map(plan => (
            <div key={plan.id}
              className={`relative bg-white rounded-2xl border flex flex-col overflow-hidden transition-shadow hover:shadow-xl ${
                plan.highlight ? 'border-[#0D47A1] shadow-lg shadow-blue-100' : 'border-slate-200'
              }`}>
              {plan.highlight && (
                <div className="bg-[#0D47A1] text-white text-[11px] font-bold text-center py-2 tracking-wider uppercase">
                  Most Popular
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
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-extrabold text-slate-900">
                        {plan.monthlyPrice === 0 ? 'Free' : `$${annual ? plan.annualPrice : plan.monthlyPrice}`}
                      </span>
                      {plan.monthlyPrice !== 0 && (
                        <span className="text-slate-400 text-sm mb-1">/mo</span>
                      )}
                    </div>
                  )}
                  {annual && !plan.free && !plan.enterprise && (
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      ${(plan.annualPrice! * 12).toLocaleString()}/yr · billed annually
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-[#0D47A1] mt-0.5 flex-shrink-0">✓</span>
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
                    className="w-full font-bold py-3 rounded-xl transition-all text-sm text-white"
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
          {['⊘ No credit card for free plan', '🛡 Enterprise-grade security', '↩ Cancel anytime', '⚡ Setup in minutes'].map(t => (
            <span key={t} className="flex items-center gap-1.5">{t}</span>
          ))}
        </div>
      </section>

      {/* Checkout modal */}
      {checkoutPlan && (
        <PaystackCheckout
          plan={checkoutPlan}
          annual={annual}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}
