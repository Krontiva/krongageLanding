'use client';
import { useState, useMemo, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';

function buildReference(planId: string, billing: 'monthly' | 'annual'): string {
  const planShort  = planId === 'professional' ? 'PRO' : planId.toUpperCase();
  const billingShort = billing === 'annual' ? 'ANN' : 'MO';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const hex  = Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');
  return `KG-${planShort}-${billingShort}-${date}-${hex}`;
}

interface Plan {
  id: string;
  name: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  currency: string;
}

interface Props {
  plan: Plan;
  annual: boolean;
  onClose: () => void;
}

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
}

type Step = 'details' | 'paying' | 'success' | 'error';

export default function PaystackCheckout({ plan, annual, onClose }: Props) {
  const [step, setStep] = useState<Step>('details');
  const [form, setForm] = useState<UserForm>({
    firstName: '', lastName: '', email: '', company: '', phone: '',
  });
  const [errors, setErrors] = useState<Partial<UserForm>>({});
  const [serverError, setServerError] = useState('');

  const billing  = annual ? 'annual' : 'monthly';
  const price    = annual ? plan.annualPrice! : plan.monthlyPrice!;
  const usdTotal = annual ? price * 12 : price;   // full USD charge (12 months if annual)

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const [ghsRate, setGhsRate]         = useState<number>(0);
  const [rateLoading, setRateLoading] = useState(true);
  const [rateError, setRateError]     = useState(false);

  useEffect(() => {
    fetch('/api/exchange-rate')
      .then(r => { if (!r.ok) throw new Error('rate unavailable'); return r.json(); })
      .then(data => {
        if (!data?.rate) throw new Error('missing rate');
        setGhsRate(data.rate);
      })
      .catch(() => setRateError(true))
      .finally(() => setRateLoading(false));
  }, []);

  const ghsTotal        = Math.round(usdTotal * ghsRate);
  const amountInPesewas = ghsTotal * 100;

  // Reference is stable for the lifetime of this modal — never changes on re-render
  const reference = useMemo(
    () => buildReference(plan.id, billing),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const config = {
    reference,
    email:    form.email,
    amount:   amountInPesewas,   // GHS pesewas
    publicKey,
    currency: 'GHS',
    metadata: {
      custom_fields: [
        { display_name: 'First Name',  variable_name: 'first_name',  value: form.firstName },
        { display_name: 'Last Name',   variable_name: 'last_name',   value: form.lastName },
        { display_name: 'Company',     variable_name: 'company',     value: form.company },
        { display_name: 'Phone',       variable_name: 'phone',       value: form.phone },
        { display_name: 'Plan ID',     variable_name: 'plan_id',     value: plan.id },
        { display_name: 'Plan Name',   variable_name: 'plan_name',   value: plan.name },
        { display_name: 'Billing',     variable_name: 'billing',     value: billing },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  function validate(): boolean {
    const e: Partial<UserForm> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.company.trim()) e.company = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSuccess(ref: { reference: string }) {
    // NOTE: Account provisioning happens server-side ONLY, via Paystack's signed
    // charge.success webhook (/api/paystack/webhook). The browser must never
    // trigger provisioning — a client-supplied "success" can't be trusted.
    // Here we only persist receipt data for display and redirect the user.

    // Save receipt data for the receipt page (sessionStorage survives the redirect)
    const receipt = {
      reference:    ref.reference,
      planName:     plan.name,
      planId:       plan.id,
      billing,
      amount:       amountInPesewas,  // GHS pesewas
      currency:     'GHS',
      exchangeRate: ghsRate,          // rate used at checkout (1 USD = X GHS)
      usdPrice:     usdTotal,         // original USD amount for display
      issuedAt:     new Date().toISOString(),
      user: {
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        company:   form.company,
        phone:     form.phone,
      },
    };
    sessionStorage.setItem('kg_receipt', JSON.stringify(receipt));
    window.location.href = `/receipt?ref=${encodeURIComponent(ref.reference)}`;
  }

  function onPaystackClose() {
    setStep('details');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep('paying');
    initializePayment({ onSuccess, onClose: onPaystackClose });
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
              <span style={{ fontSize: '28px', fontWeight: 800 }}>${price.toLocaleString()}</span>
              <span style={{ fontSize: '14px', opacity: 0.7 }}>/mo</span>
            </div>
            {annual ? (
              <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                ${(price * 12).toLocaleString()} billed annually · <span style={{ color: '#86efac', fontWeight: 700 }}>Save 12%</span>
              </div>
            ) : (
              <div style={{ fontSize: '12px', opacity: 0.65, marginTop: '4px' }}>
                Billed monthly · Cancel anytime
              </div>
            )}
          </div>

          {/* Body */}
          <div style={{ paddingLeft: '28px', paddingRight: '28px', paddingTop: '24px', paddingBottom: '28px' }}>
            {step === 'success' ? (
              <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '16px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>You&apos;re all set!</h3>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                  Your {plan.name} plan is active. Check your email for onboarding details.
                </p>
                <button
                  onClick={onClose}
                  style={{
                    background: '#0D47A1', color: '#fff', fontFamily: 'Manrope, system-ui, sans-serif',
                    fontWeight: 700, fontSize: '15px', border: 'none', cursor: 'pointer',
                    paddingLeft: '32px', paddingRight: '32px', paddingTop: '12px', paddingBottom: '12px',
                    borderRadius: '50px',
                  }}
                >
                  Done
                </button>
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
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '2px' }}>
                  Fill in your details to complete your subscription.
                </p>

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

                {rateError ? (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '13px', color: '#ef4444', marginBottom: '10px' }}>
                      Unable to load rate — please try again.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setRateError(false);
                        setRateLoading(true);
                        fetch('/api/exchange-rate')
                          .then(r => { if (!r.ok) throw new Error(); return r.json(); })
                          .then(data => { if (!data?.rate) throw new Error(); setGhsRate(data.rate); })
                          .catch(() => setRateError(true))
                          .finally(() => setRateLoading(false));
                      }}
                      style={{
                        background: '#0D47A1', color: '#fff', fontFamily: 'Manrope, system-ui, sans-serif',
                        fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer',
                        paddingTop: '14px', paddingBottom: '14px', width: '100%',
                        borderRadius: '50px', transition: 'background 0.15s',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={step === 'paying' || rateLoading}
                    style={{
                      width: '100%',
                      background: (step === 'paying' || rateLoading) ? '#94a3b8' : '#0D47A1',
                      color: '#fff',
                      fontFamily: 'Manrope, system-ui, sans-serif',
                      fontWeight: 800,
                      fontSize: '15px',
                      border: 'none',
                      cursor: (step === 'paying' || rateLoading) ? 'not-allowed' : 'pointer',
                      paddingTop: '14px',
                      paddingBottom: '14px',
                      borderRadius: '50px',
                      marginTop: '4px',
                      transition: 'background 0.15s',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {rateLoading
                      ? 'Loading…'
                      : step === 'paying'
                        ? 'Opening Paystack…'
                        : annual
                          ? `Pay $${(price * 12).toLocaleString()}/yr →`
                          : `Pay $${price.toLocaleString()}/mo →`
                    }
                  </button>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="5.5" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
                    <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Secured by Paystack · Your data is encrypted
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
