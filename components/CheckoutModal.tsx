'use client';
import { useState, useMemo } from 'react';
import { formatUsd } from '@/src/lib/format-price';

/**
 * Paid-plan signup: collect details, then hand off to Stripe-hosted Checkout.
 *
 * We hold no payment key and load no payment SDK. The flow is:
 *   this form → POST /api/checkout (server, holds WEBHOOK_SECRET)
 *             → admin creates the Stripe session
 *             → we redirect to the returned checkout.stripe.com URL
 *
 * Everything after the redirect is out of our hands: the card is captured by
 * Stripe, and the account is provisioned from Stripe's webhook to admin — never
 * from the browser. Landing back on /signup/complete is not proof of payment.
 *
 * Prices are USD; there is no currency conversion anywhere in this flow.
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §2.
 */

/** Used only if admin omits trialDays; admin's value always wins. */
const FALLBACK_TRIAL_DAYS = 14;

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number | null;
  /** Discounted monthly-equivalent — the headline "/mo" figure on annual. */
  annualPrice: number | null;
  /** What Stripe charges for a year. Never derive it by multiplying by 12. */
  annualTotal?: number | null;
  trialDays?: number | null;
  currency: string;
}

interface Props {
  plan: Plan;
  annual: boolean;
  onClose: () => void;
}

/**
 * Why an existing email was rejected. Admin distinguishes these because sending a
 * lapsed customer to a plain "sign in" is a dead end — they need to know they can
 * restart the plan themselves.
 */
type ConflictReason = 'active_account' | 'subscription_inactive';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
}

type Step = 'details' | 'redirecting' | 'exists' | 'error';

export default function CheckoutModal({ plan, annual, onClose }: Props) {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<UserForm>({
    firstName: '', lastName: '', email: '', company: '', phone: '',
  });
  const [errors, setErrors] = useState<Partial<UserForm>>({});
  const [serverError, setServerError] = useState('');
  const [loginUrl, setLoginUrl] = useState('https://web.krongage.io');
  const [conflictReason, setConflictReason] = useState<ConflictReason>('active_account');

  const billing = annual ? 'annual' : 'monthly';
  const price   = annual ? plan.annualPrice! : plan.monthlyPrice!;
  const trialDays = plan.trialDays ?? FALLBACK_TRIAL_DAYS;

  // The amount that actually leaves the customer's account at trial end. On annual
  // that's the full-year total, NOT the "/mo" figure in the header above it.
  const chargeAmount = annual ? plan.annualTotal ?? price * 12 : price;

  // Stripe charges nothing today and starts billing at trial end. Shown so the
  // customer knows exactly what happens and when.
  const firstChargeLabel = useMemo(
    () => new Date(Date.now() + trialDays * 864e5).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    }),
    [trialDays],
  );

  function validate(): boolean {
    const e: Partial<UserForm> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.company.trim()) e.company = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep('redirecting');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: { id: plan.id, billing },
          user: {
            firstName: form.firstName,
            lastName:  form.lastName,
            email:     form.email.trim().toLowerCase(),
            company:   form.company,
            phone:     form.phone,
          },
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.status === 409) {
        // login_url is opaque and may carry a path (the inactive-plan one does) —
        // redirect to exactly what admin sends, don't rebuild it.
        setLoginUrl(data?.login_url || 'https://web.krongage.io');
        setConflictReason(
          data?.reason === 'subscription_inactive' ? 'subscription_inactive' : 'active_account',
        );
        setStep('exists');
        return;
      }

      if (!res.ok || !data?.url) {
        setServerError(
          res.status === 429
            ? 'Too many attempts — please wait a moment and try again.'
            : 'We couldn’t start checkout. Please try again shortly.',
        );
        setStep('error');
        return;
      }

      // Hand off to Stripe. No further state here — the user leaves this page.
      window.location.href = data.url;
    } catch {
      setServerError('Network error — please check your connection and try again.');
      setStep('error');
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    paddingLeft: '12px',
    paddingRight: '12px',
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: '14px',
    fontFamily: 'Manrope, system-ui, sans-serif',
    outline: 'none',
    color: '#0f172a',
    background: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  const inputError: React.CSSProperties = { ...inputBase, borderColor: '#f87171' };

  const primaryButton: React.CSSProperties = {
    background: '#0D47A1', color: '#fff', fontFamily: 'Manrope, system-ui, sans-serif',
    fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer',
    paddingLeft: '32px', paddingRight: '32px', paddingTop: '14px', paddingBottom: '14px',
    borderRadius: '50px', textDecoration: 'none', display: 'inline-block',
  };

  return (
    <>
      <style>{`
        .pc-input:focus { border-color: #0D47A1 !important; }
        .pc-overlay { animation: pc-fade-in 0.15s ease; }
        .pc-card { animation: pc-slide-up 0.2s ease; }
        @keyframes pc-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pc-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div
        className="pc-overlay"
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px',
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div
          className="pc-card"
          style={{
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            width: '100%',
            maxWidth: '440px',
            overflow: 'hidden',
            fontFamily: 'Manrope, system-ui, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ background: '#0D47A1', paddingLeft: '28px', paddingRight: '28px', paddingTop: '24px', paddingBottom: '24px', color: '#fff', position: 'relative' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                position: 'absolute', top: '16px', right: '20px',
                background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                width: '28px', height: '28px', cursor: 'pointer',
                color: '#fff', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ×
            </button>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              {annual ? 'Annual Plan' : 'Monthly Plan'}
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>
              {plan.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800 }}>${formatUsd(price)}</span>
              <span style={{ fontSize: '14px', opacity: 0.7 }}>/mo</span>
              {annual && (
                <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '4px' }}>
                  · <span style={{ color: '#86efac', fontWeight: 700 }}>Save 12%</span>
                </span>
              )}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', background: 'rgba(134,239,172,0.18)', color: '#bbf7d0', fontWeight: 700, fontSize: '12px', padding: '4px 10px', borderRadius: '50px' }}>
              🎁 {trialDays}-day free trial
            </div>
            {/* The full deal in one sentence — what starts, what it costs, when, and
                how to avoid it. On annual the charge is the whole year, not the "/mo"
                figure above, so name the exact amount: a customer who thinks they're
                trialling $51.92 and sees $623.04 leave their account will dispute it. */}
            <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '10px', lineHeight: 1.6 }}>
              <strong style={{ fontWeight: 800 }}>
                Start your {trialDays}-day free trial ($0 today).
              </strong>{' '}
              Enter your card details on Stripe&apos;s secure checkout page — cancel any time before{' '}
              <strong style={{ fontWeight: 800 }}>{firstChargeLabel}</strong>{' '}
              and you won&apos;t be charged. Otherwise, it&apos;s{' '}
              <strong style={{ fontWeight: 800 }}>
                ${formatUsd(chargeAmount)}{annual ? ' for the full year' : '/month'}
              </strong>{' '}
              starting then.
            </div>
          </div>

          {/* Body */}
          <div style={{ paddingLeft: '28px', paddingRight: '28px', paddingTop: '24px', paddingBottom: '28px' }}>
            {step === 'exists' ? (
              <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {conflictReason === 'subscription_inactive' ? '🔑' : '👋'}
                </div>
                {conflictReason === 'subscription_inactive' ? (
                  <>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      Your plan isn&apos;t active
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                      You already have a KronGage account for{' '}
                      <strong style={{ color: '#0f172a' }}>{form.email.trim().toLowerCase()}</strong>, but your
                      plan isn&apos;t active. Sign in to reactivate it — you can add a card and restart your
                      plan yourself, no need to talk to us.
                    </p>
                    <a href={loginUrl} style={primaryButton}>Sign in to reactivate →</a>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      You already have a KronGage account
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                      <strong style={{ color: '#0f172a' }}>{form.email.trim().toLowerCase()}</strong> is already
                      registered, so there&apos;s nothing to pay for. Sign in instead — you can change your plan
                      from inside the app.
                    </p>
                    <a href={loginUrl} style={primaryButton}>Sign in →</a>
                  </>
                )}
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '18px', lineHeight: 1.6 }}>
                  Wrong email?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    style={{ color: '#0D47A1', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Manrope, system-ui, sans-serif', fontSize: '13px', padding: 0 }}
                  >
                    Go back and edit it
                  </button>
                </p>
              </div>
            ) : step === 'error' ? (
              <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Something went wrong</h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '16px' }}>{serverError}</p>
                <button
                  onClick={() => setStep('details')}
                  style={{ color: '#0D47A1', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'Manrope, system-ui, sans-serif' }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* No intro paragraph here — the header above already states the trial,
                    the card requirement, the amount and the date. */}

                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {(['firstName', 'lastName'] as const).map((key) => (
                    <div key={key}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                        {key === 'firstName' ? 'First Name' : 'Last Name'}
                      </label>
                      <input
                        className="pc-input"
                        style={errors[key] ? inputError : inputBase}
                        value={form[key]}
                        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                        placeholder={key === 'firstName' ? 'Jane' : 'Smith'}
                      />
                      {errors[key] && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '3px' }}>{errors[key]}</p>}
                    </div>
                  ))}
                </div>

                {/* Other fields */}
                {([
                  ['email',   'Work Email',        'email', 'jane@company.com'],
                  ['company', 'Company Name',       'text',  'Acme Corp'],
                  ['phone',   'Phone (optional)',   'tel',   '+1 234 567 8900'],
                ] as const).map(([key, label, type, placeholder]) => (
                  <div key={key}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      {label}
                    </label>
                    <input
                      className="pc-input"
                      type={type}
                      style={errors[key as keyof UserForm] ? inputError : inputBase}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                    />
                    {errors[key as keyof UserForm] && (
                      <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '3px' }}>{errors[key as keyof UserForm]}</p>
                    )}
                  </div>
                ))}

                {/* This email becomes the login identity and the Stripe customer email */}
                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.5, marginTop: '-4px' }}>
                  Your login details will be sent to this email address.
                </p>

                <button
                  type="submit"
                  disabled={step === 'redirecting'}
                  style={{
                    width: '100%',
                    background: step === 'redirecting' ? '#94a3b8' : '#0D47A1',
                    color: '#fff',
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: '15px',
                    border: 'none',
                    cursor: step === 'redirecting' ? 'not-allowed' : 'pointer',
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    borderRadius: '50px',
                    marginTop: '4px',
                    transition: 'background 0.15s',
                    letterSpacing: '0.01em',
                  }}
                >
                  {step === 'redirecting' ? 'Opening secure checkout…' : 'Start free trial →'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="5.5" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
                    <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Secured by Stripe · We never see your card details
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
