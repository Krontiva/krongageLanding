'use client';
import { useState } from 'react';
import { usePaystackPayment } from 'react-paystack';

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

  const price = annual ? plan.annualPrice! : plan.monthlyPrice!;
  // Paystack amount in smallest currency unit (cents for USD)
  // Annual = monthly rate × 12 charged upfront
  const amountInCents = annual ? price * 12 * 100 : price * 100;

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const config = {
    reference: `KG-${plan.id}-${Date.now()}`,
    email: form.email,
    amount: amountInCents,
    publicKey,
    currency: 'USD',
    metadata: {
      // All user + plan fields embedded so the server-side Paystack webhook
      // can reconstruct the full payload without relying on the client callback.
      custom_fields: [
        { display_name: 'First Name',  variable_name: 'first_name',  value: form.firstName },
        { display_name: 'Last Name',   variable_name: 'last_name',   value: form.lastName },
        { display_name: 'Company',     variable_name: 'company',     value: form.company },
        { display_name: 'Phone',       variable_name: 'phone',       value: form.phone },
        { display_name: 'Plan ID',     variable_name: 'plan_id',     value: plan.id },
        { display_name: 'Plan Name',   variable_name: 'plan_name',   value: plan.name },
        { display_name: 'Billing',     variable_name: 'billing',     value: annual ? 'annual' : 'monthly' },
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

  async function handleWebhook(reference: string, status: string) {
    try {
      const res = await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            company: form.company,
            phone: form.phone,
          },
          plan: {
            id: plan.id,
            name: plan.name,
            billing: annual ? 'annual' : 'monthly',
          },
          reference,
          status,
          amount: amountInCents,   // cents, per canonical spec (500000 = $5,000)
          currency: plan.currency,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error('Webhook error:', err);
      // Don't block success UI for webhook failures — log only
    }
  }

  function onSuccess(ref: { reference: string }) {
    handleWebhook(ref.reference, 'success');
    setStep('success');
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
        style={{ fontFamily: 'Manrope, system-ui, sans-serif' }}>

        {/* Header */}
        <div className="bg-[#0D47A1] px-6 py-5 text-white">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              {annual ? 'Annual Plan' : 'Monthly Plan'}
            </span>
            <button onClick={onClose} className="opacity-60 hover:opacity-100 text-xl leading-none">×</button>
          </div>
          <div className="text-xl font-extrabold">{plan.name} — ${price.toLocaleString()}/mo</div>
          {annual ? (
            <div className="text-xs opacity-70 mt-0.5">
              ${(price * 12).toLocaleString()} charged annually · Save 12%
            </div>
          ) : (
            <div className="text-xs opacity-60 mt-0.5">Billed monthly · Cancel anytime</div>
          )}
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {step === 'success' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">You&apos;re all set!</h3>
              <p className="text-slate-500 text-sm mb-6">
                Your {plan.name} plan is active. Check your email for onboarding details.
              </p>
              <button onClick={onClose}
                className="bg-[#0D47A1] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#0a3680] transition-colors">
                Done
              </button>
            </div>
          ) : step === 'error' ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Something went wrong</h3>
              <p className="text-slate-500 text-sm mb-2">{serverError}</p>
              <button onClick={() => setStep('details')}
                className="text-[#0D47A1] font-bold text-sm underline">
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-slate-500">Fill in your details to complete your subscription.</p>

              <div className="grid grid-cols-2 gap-3">
                {([
                  ['firstName', 'First Name'],
                  ['lastName', 'Last Name'],
                ] as const).map(([key, label]) => (
                  <div key={key}>
                    <label className="text-xs font-bold text-slate-600 block mb-1">{label}</label>
                    <input
                      value={form[key]}
                      onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                      className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D47A1] transition-colors ${
                        errors[key] ? 'border-red-400' : 'border-slate-200'
                      }`}
                      placeholder={label}
                    />
                    {errors[key] && <p className="text-xs text-red-500 mt-0.5">{errors[key]}</p>}
                  </div>
                ))}
              </div>

              {([
                ['email', 'Work Email', 'email', 'you@company.com'],
                ['company', 'Company Name', 'text', 'Acme Corp'],
                ['phone', 'Phone (optional)', 'tel', '+1 234 567 8900'],
              ] as const).map(([key, label, type, placeholder]) => (
                <div key={key}>
                  <label className="text-xs font-bold text-slate-600 block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#0D47A1] transition-colors ${
                      errors[key as keyof UserForm] ? 'border-red-400' : 'border-slate-200'
                    }`}
                    placeholder={placeholder}
                  />
                  {errors[key as keyof UserForm] && (
                    <p className="text-xs text-red-500 mt-0.5">{errors[key as keyof UserForm]}</p>
                  )}
                </div>
              ))}

              <button type="submit" disabled={step === 'paying'}
                className="w-full bg-[#0D47A1] text-white font-bold py-3 rounded-xl hover:bg-[#0a3680] transition-colors disabled:opacity-60 text-sm mt-2">
                {step === 'paying'
                  ? 'Opening Paystack...'
                  : annual
                    ? `Pay $${(price * 12).toLocaleString()}/yr →`
                    : `Pay $${price.toLocaleString()}/mo →`
                }
              </button>

              <p className="text-xs text-slate-400 text-center">
                Secured by Paystack · Your data is encrypted
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
