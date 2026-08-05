'use client';
import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatUsd } from '@/src/lib/format-price';
import { storeEmbeddedSession } from '@/src/lib/checkout-session';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userDetailsSchema, type UserDetails } from '@/lib/schemas/user-details';

/**
 * Paid-plan signup: collect details, then hand off to Stripe Checkout.
 *
 * Two modes, chosen by NEXT_PUBLIC_CHECKOUT_MODE:
 *
 *   unset / anything else   this form → POST /api/checkout → redirect to
 *                           checkout.stripe.com. The proven path; the default
 *                           on purpose, so a missing or fat-fingered env var
 *                           fails back to the flow that works.
 *
 *   'embedded'              this form → POST /api/checkout with ui_mode →
 *                           client secret → /checkout, where Stripe's form is
 *                           mounted inside our own layout.
 *
 * Either way we hold no secret: the server route holds WEBHOOK_SECRET, and in
 * embedded mode the publishable key arrives with the session rather than from
 * our env. The card is always captured by Stripe, and the account is always
 * provisioned from Stripe's webhook to admin — never from the browser. Landing
 * on /signup/complete is not proof of payment in either mode.
 *
 * Prices are USD; there is no currency conversion anywhere in this flow.
 * Contract: docs/13-KRONGAGE-IO-STRIPE-HANDOFF.md §2.
 */

const EMBEDDED = process.env.NEXT_PUBLIC_CHECKOUT_MODE === 'embedded';

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

type Step = 'details' | 'redirecting' | 'exists' | 'error';

const fieldBase = "w-full border-[1.5px] border-[#e2e8f0] rounded-[10px] px-3 py-[10px] text-sm outline-none text-[#0f172a] bg-white box-border transition-colors focus-visible:border-[#0D47A1]";
const fieldError = "w-full border-[1.5px] border-[#f87171] rounded-[10px] px-3 py-[10px] text-sm outline-none text-[#0f172a] bg-white box-border transition-colors focus-visible:border-[#0D47A1]";
const labelClass = "text-xs font-bold text-[#475569] block mb-[5px]";
const primaryButtonClass = "bg-[#0D47A1] text-white font-extrabold text-[15px] border-none cursor-pointer px-8 py-[14px] rounded-full no-underline inline-block";

export default function CheckoutModal({ plan, annual, onClose }: Props) {
  const [step, setStep] = useState<Step>('details');
  const [serverError, setServerError] = useState('');
  const [loginUrl, setLoginUrl] = useState('https://web.krongage.io');
  const [conflictReason, setConflictReason] = useState<ConflictReason>('active_account');
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDetails>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: { firstName: '', lastName: '', email: '', company: '', phone: '' },
  });

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

  async function onValid(form: UserDetails) {
    setStep('redirecting');
    setSubmittedEmail(form.email.trim().toLowerCase());

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
          // Omitted entirely in redirect mode so admin's response is byte-for-byte
          // the one that was proven end to end.
          ...(EMBEDDED ? { ui_mode: 'embedded' } : {}),
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

      const usable = res.ok && (EMBEDDED ? data?.client_secret && data?.publishable_key : data?.url);
      if (!usable) {
        setServerError(
          res.status === 429
            ? 'Too many attempts — please wait a moment and try again.'
            : 'We couldn’t start checkout. Please try again shortly.',
        );
        setStep('error');
        return;
      }

      if (EMBEDDED) {
        // Stash the session and move to our own page. If storage is unavailable
        // (private mode, storage disabled) there is nothing for /checkout to
        // read, so fall through to the error state rather than routing to a page
        // that can only dead-end.
        try {
          storeEmbeddedSession({
            clientSecret:   data.client_secret,
            publishableKey: data.publishable_key,
            sessionId:      data.session_id ?? null,
            planId:         plan.id,
            planName:       plan.name,
            billing,
          });
        } catch {
          setServerError('Your browser blocked checkout storage. Please try again with private browsing off.');
          setStep('error');
          return;
        }
        window.location.href = '/checkout';
        return;
      }

      // Hand off to Stripe. No further state here — the user leaves this page.
      window.location.href = data.url;
    } catch {
      setServerError('Network error — please check your connection and try again.');
      setStep('error');
    }
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent
        showCloseButton={false}
        aria-describedby={undefined}
        className="p-0 gap-0 max-w-[440px] rounded-[20px] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#0D47A1] px-7 py-6 text-white relative">
          <DialogClose asChild>
            <button
              type="button"
              className="absolute top-4 right-5 bg-white/15 border-none rounded-full w-7 h-7 cursor-pointer text-white text-base flex items-center justify-center leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </DialogClose>
          <div className="text-[11px] font-bold tracking-[0.1em] uppercase opacity-65 mb-1.5">
            {annual ? 'Annual Plan' : 'Monthly Plan'}
          </div>
          <DialogTitle className="text-[22px] font-extrabold leading-[1.2] mb-1 text-white">
            {plan.name}
          </DialogTitle>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-extrabold">${formatUsd(price)}</span>
            <span className="text-sm opacity-70">/mo</span>
            {annual && (
              <span className="text-xs opacity-70 ml-1">
                · <span className="text-[#86efac] font-bold">Save 12%</span>
              </span>
            )}
          </div>
          <div className="inline-flex items-center gap-1.5 mt-2.5 bg-[#86efac]/[0.18] text-[#bbf7d0] font-bold text-xs px-2.5 py-1 rounded-full">
            🎁 {trialDays}-day free trial
          </div>
          {/* The full deal in one sentence — what starts, what it costs, when, and
              how to avoid it. On annual the charge is the whole year, not the "/mo"
              figure above, so name the exact amount: a customer who thinks they're
              trialling $51.92 and sees $623.04 leave their account will dispute it. */}
          <div className="text-xs opacity-80 mt-2.5 leading-[1.6]">
            <strong className="font-extrabold">
              Start your {trialDays}-day free trial ($0 today).
            </strong>{' '}
            {EMBEDDED
              ? 'Enter your card details on the next step — Stripe handles them securely and we never see them'
              : 'Enter your card details on Stripe’s secure checkout page'} — cancel any time before{' '}
            <strong className="font-extrabold">{firstChargeLabel}</strong>{' '}
            and you won&apos;t be charged. Otherwise, it&apos;s{' '}
            <strong className="font-extrabold">
              ${formatUsd(chargeAmount)}{annual ? ' for the full year' : '/month'}
            </strong>{' '}
            starting then.
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-7">
          {step === 'exists' ? (
            <div className="text-center pt-4 pb-4">
              <div className="text-5xl mb-4">
                {conflictReason === 'subscription_inactive' ? '🔑' : '👋'}
              </div>
              {conflictReason === 'subscription_inactive' ? (
                <>
                  <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                    Your plan isn&apos;t active
                  </h3>
                  <p className="text-[#64748b] text-sm leading-[1.6] mb-6">
                    You already have a KronGage account for{' '}
                    <strong className="text-[#0f172a]">{submittedEmail}</strong>, but your
                    plan isn&apos;t active. Sign in to reactivate it — you can add a card and restart your
                    plan yourself, no need to talk to us.
                  </p>
                  <a href={loginUrl} className={primaryButtonClass}>Sign in to reactivate →</a>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">
                    You already have a KronGage account
                  </h3>
                  <p className="text-[#64748b] text-sm leading-[1.6] mb-6">
                    <strong className="text-[#0f172a]">{submittedEmail}</strong> is already
                    registered, so there&apos;s nothing to pay for. Sign in instead — you can change your plan
                    from inside the app.
                  </p>
                  <a href={loginUrl} className={primaryButtonClass}>Sign in →</a>
                </>
              )}
              <p className="text-[13px] text-[#94a3b8] mt-[18px] leading-[1.6]">
                Wrong email?{' '}
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-[#0D47A1] font-bold bg-transparent border-none cursor-pointer underline text-[13px] p-0"
                >
                  Go back and edit it
                </button>
              </p>
            </div>
          ) : step === 'error' ? (
            <div className="text-center pt-4 pb-4">
              <div className="text-5xl mb-4">⚠️</div>
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-2">Something went wrong</h3>
              <p className="text-[#64748b] text-sm mb-4">{serverError}</p>
              <button
                onClick={() => setStep('details')}
                className="text-[#0D47A1] font-bold text-sm bg-transparent border-none cursor-pointer underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
              {/* No intro paragraph here — the header above already states the trial,
                  the card requirement, the amount and the date. */}

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className={labelClass}>
                    First Name
                  </Label>
                  <Input
                    className={errors.firstName ? fieldError : fieldBase}
                    placeholder="Jane"
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="text-[11px] text-[#ef4444] mt-[3px]">{errors.firstName.message}</p>}
                </div>
                <div>
                  <Label className={labelClass}>
                    Last Name
                  </Label>
                  <Input
                    className={errors.lastName ? fieldError : fieldBase}
                    placeholder="Smith"
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="text-[11px] text-[#ef4444] mt-[3px]">{errors.lastName.message}</p>}
                </div>
              </div>

              {/* Other fields */}
              <div>
                <Label className={labelClass}>
                  Work Email
                </Label>
                <Input
                  type="email"
                  className={errors.email ? fieldError : fieldBase}
                  placeholder="jane@company.com"
                  {...register('email')}
                />
                {errors.email && <p className="text-[11px] text-[#ef4444] mt-[3px]">{errors.email.message}</p>}
              </div>
              <div>
                <Label className={labelClass}>
                  Company Name
                </Label>
                <Input
                  className={errors.company ? fieldError : fieldBase}
                  placeholder="Acme Corp"
                  {...register('company')}
                />
                {errors.company && <p className="text-[11px] text-[#ef4444] mt-[3px]">{errors.company.message}</p>}
              </div>
              <div>
                <Label className={labelClass}>
                  Phone (optional)
                </Label>
                <Input
                  type="tel"
                  className={fieldBase}
                  placeholder="+1 234 567 8900"
                  {...register('phone')}
                />
              </div>

              {/* This email becomes the login identity and the Stripe customer email */}
              <p className="text-xs text-[#94a3b8] leading-[1.5] -mt-1">
                Your login details will be sent to this email address.
              </p>

              <button
                type="submit"
                disabled={step === 'redirecting'}
                className={`w-full text-white font-extrabold text-[15px] border-none py-[14px] rounded-full mt-1 transition-colors tracking-[0.01em] ${step === 'redirecting' ? 'bg-[#94a3b8] cursor-not-allowed' : 'bg-[#0D47A1] cursor-pointer'}`}
              >
                {step === 'redirecting' ? 'Opening secure checkout…' : 'Start free trial →'}
              </button>

              <div className="flex items-center justify-center gap-1.5">
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="shrink-0">
                  <rect x="1" y="5.5" width="10" height="8" rx="1.5" stroke="#94a3b8" strokeWidth="1.2" fill="none"/>
                  <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <p className="text-xs text-[#94a3b8]">
                  Secured by Stripe · We never see your card details
                </p>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
