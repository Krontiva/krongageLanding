'use client';
import { useState } from 'react';

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
}

type Step = 'form' | 'submitting' | 'exists' | 'error';

/**
 * Why an existing email was rejected. `subscription_inactive` matters because
 * sending a lapsed customer to a plain "sign in" is a dead end — they can restart
 * the plan themselves from the Customer Portal. `duplicate_purchase` is admin's
 * double-submit guard (handoff §12a); the useful instruction is the same as an
 * active account, so it renders that way.
 */
type ConflictReason = 'active_account' | 'subscription_inactive' | 'duplicate_purchase';

interface Props {
  onClose: () => void;
}

export default function StarterSignupModal({ onClose }: Props) {
  const [step, setStep]               = useState<Step>('form');
  const [form, setForm]               = useState<UserForm>({ firstName: '', lastName: '', email: '', company: '', phone: '' });
  const [errors, setErrors]           = useState<Partial<UserForm>>({});
  const [serverError, setServerError] = useState('');
  const [loginUrl, setLoginUrl]       = useState('https://web.krongage.io');
  const [conflictReason, setConflictReason] = useState<ConflictReason>('active_account');

  function validate(): boolean {
    const e: Partial<UserForm> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim())  e.lastName  = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.company.trim())   e.company   = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep('submitting');

    try {
      const res = await fetch('/api/signup/starter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: form }),
      });

      const data = await res.json().catch(() => ({}));

      // Already registered — not an error state. Before this was handled, a
      // double-submit showed "Something went wrong", which reads as a broken site
      // rather than "you're already signed up".
      if (res.status === 409) {
        // login_url is opaque and may carry a path — use exactly what came back.
        setLoginUrl(data?.login_url || 'https://web.krongage.io');
        setConflictReason(
          data?.reason === 'subscription_inactive' ? 'subscription_inactive'
          : data?.reason === 'duplicate_purchase'  ? 'duplicate_purchase'
          : 'active_account',
        );
        setStep('exists');
        return;
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Signup failed');
      }

      window.location.href = `/signup/complete?plan=Starter&billing=free&type=free`;
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStep('error');
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px',
    padding: '10px 12px',
    fontSize: '14px',
    fontFamily: 'Manrope, system-ui, sans-serif',
    outline: 'none',
    color: '#0f172a',
    background: '#fff',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };
  const inputErr: React.CSSProperties = { ...inputBase, borderColor: '#f87171' };

  return (
    <>
      <style>{`
        .ss-input:focus { border-color: #0D47A1 !important; }
        .ss-overlay { animation: ss-fade 0.15s ease; }
        .ss-card   { animation: ss-up   0.2s  ease; }
        @keyframes ss-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ss-up   { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* Backdrop */}
      <div
        className="ss-overlay"
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
          className="ss-card"
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
          <div style={{
            background: '#0D47A1',
            padding: '24px 28px',
            color: '#fff',
            position: 'relative',
          }}>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: 'absolute', top: '16px', right: '20px',
                background: 'rgba(255,255,255,0.15)', border: 'none',
                borderRadius: '50%', width: '28px', height: '28px',
                cursor: 'pointer', color: '#fff', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >×</button>

            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.65, marginBottom: '6px' }}>
              Free Plan
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>
              Get Started Free
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800 }}>$0</span>
              <span style={{ fontSize: '14px', opacity: 0.7 }}>/mo — no credit card needed</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px 28px' }}>
            {step === 'exists' ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                  {conflictReason === 'subscription_inactive' ? '🔑' : '👋'}
                </div>
                {conflictReason === 'subscription_inactive' ? (
                  <>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      Your plan isn&apos;t active
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                      You already have a KronGage account for{' '}
                      <strong style={{ color: '#0f172a' }}>{form.email.trim().toLowerCase()}</strong>, but your
                      plan isn&apos;t active. Sign in to reactivate it yourself — no need to talk to us.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                      You already have a KronGage account
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
                      <strong style={{ color: '#0f172a' }}>{form.email.trim().toLowerCase()}</strong> is already
                      registered. Sign in instead — nothing has been created twice.
                    </p>
                  </>
                )}
                <a
                  href={loginUrl}
                  style={{
                    background: '#0D47A1', color: '#fff', fontWeight: 800, fontSize: '15px',
                    padding: '14px 32px', borderRadius: '50px', textDecoration: 'none',
                    display: 'inline-block', fontFamily: 'Manrope, system-ui, sans-serif',
                  }}
                >
                  {conflictReason === 'subscription_inactive' ? 'Sign in to reactivate →' : 'Sign in →'}
                </a>
                <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '18px', lineHeight: 1.6 }}>
                  Wrong email?{' '}
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    style={{
                      color: '#0D47A1', fontWeight: 700, background: 'none', border: 'none',
                      cursor: 'pointer', textDecoration: 'underline', fontSize: '13px', padding: 0,
                      fontFamily: 'Manrope, system-ui, sans-serif',
                    }}
                  >
                    Go back and edit it
                  </button>
                </p>
              </div>
            ) : step === 'error' ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚠️</div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                  Something went wrong
                </h3>
                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>{serverError}</p>
                <button
                  onClick={() => setStep('form')}
                  style={{
                    color: '#0D47A1', fontWeight: 700, fontSize: '14px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textDecoration: 'underline', fontFamily: 'Manrope, system-ui, sans-serif',
                  }}
                >Try again</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '2px' }}>
                  Create your free workspace — no payment required.
                </p>

                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {(['firstName', 'lastName'] as const).map(key => (
                    <div key={key}>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                        {key === 'firstName' ? 'First Name' : 'Last Name'}
                      </label>
                      <input
                        className="ss-input"
                        style={errors[key] ? inputErr : inputBase}
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
                  ['email',   'Work Email',       'email', 'jane@company.com'],
                  ['company', 'Company Name',      'text',  'Acme Corp'],
                  ['phone',   'Phone (optional)',  'tel',   '+1 234 567 8900'],
                ] as const).map(([key, label, type, placeholder]) => (
                  <div key={key}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '5px' }}>
                      {label}
                    </label>
                    <input
                      className="ss-input"
                      type={type}
                      style={errors[key as keyof UserForm] ? inputErr : inputBase}
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                    />
                    {errors[key as keyof UserForm] && (
                      <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '3px' }}>
                        {errors[key as keyof UserForm]}
                      </p>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={step === 'submitting'}
                  style={{
                    width: '100%',
                    background: step === 'submitting' ? '#94a3b8' : '#0D47A1',
                    color: '#fff',
                    fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 800,
                    fontSize: '15px',
                    border: 'none',
                    cursor: step === 'submitting' ? 'not-allowed' : 'pointer',
                    padding: '14px 20px',
                    borderRadius: '50px',
                    marginTop: '4px',
                    transition: 'background 0.15s',
                    letterSpacing: '0.01em',
                  }}
                >
                  {step === 'submitting' ? 'Creating your workspace…' : 'Create Free Account →'}
                </button>

                <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
                  No credit card required · Cancel anytime
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
