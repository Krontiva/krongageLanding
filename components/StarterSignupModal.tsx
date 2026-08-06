'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Key, HandWaving, Warning } from '@phosphor-icons/react';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userDetailsSchema, type UserDetails } from '@/lib/schemas/user-details';

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

const fieldBase = "w-full border-[1.5px] border-[#e2e8f0] rounded-[10px] px-3 py-[10px] text-sm outline-none text-[#0f172a] bg-white box-border transition-colors focus-visible:border-[#0D47A1]";
const fieldError = "w-full border-[1.5px] border-[#f87171] rounded-[10px] px-3 py-[10px] text-sm outline-none text-[#0f172a] bg-white box-border transition-colors focus-visible:border-[#0D47A1]";
const labelClass = "text-xs font-bold text-[#475569] block mb-[5px]";
const primaryButtonClass = "bg-[#0D47A1] text-white font-extrabold text-[15px] px-8 py-[14px] rounded-full no-underline inline-block";

export default function StarterSignupModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>('form');
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

  async function onValid(form: UserDetails) {
    setStep('submitting');
    setSubmittedEmail(form.email.trim().toLowerCase());

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
              aria-label="Close"
              className="absolute top-4 right-5 bg-white/15 border-none rounded-full w-7 h-7 cursor-pointer text-white text-base flex items-center justify-center"
            >×</button>
          </DialogClose>

          <div className="text-[11px] font-bold tracking-[0.1em] uppercase opacity-65 mb-1.5">
            Free Plan
          </div>
          <DialogTitle className="text-[22px] font-extrabold leading-[1.2] mb-1 text-white">
            Get Started Free
          </DialogTitle>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-extrabold">$0</span>
            <span className="text-sm opacity-70">/mo — no credit card needed</span>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pt-6 pb-7">
          {step === 'exists' ? (
            <div className="text-center py-4">
              <div className="flex items-center justify-center mb-3">
                {conflictReason === 'subscription_inactive'
                  ? <Key size={40} weight="duotone" />
                  : <HandWaving size={40} weight="duotone" />}
              </div>
              {conflictReason === 'subscription_inactive' ? (
                <>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
                    Your plan isn&apos;t active
                  </h3>
                  <p className="text-[#64748b] text-sm leading-[1.6] mb-5">
                    You already have a KronGage account for{' '}
                    <strong className="text-[#0f172a]">{submittedEmail}</strong>, but your
                    plan isn&apos;t active. Sign in to reactivate it yourself — no need to talk to us.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
                    You already have a KronGage account
                  </h3>
                  <p className="text-[#64748b] text-sm leading-[1.6] mb-5">
                    <strong className="text-[#0f172a]">{submittedEmail}</strong> is already
                    registered. Sign in instead — nothing has been created twice.
                  </p>
                </>
              )}
              <a
                href={loginUrl}
                className={primaryButtonClass}
              >
                {conflictReason === 'subscription_inactive' ? 'Sign in to reactivate →' : 'Sign in →'}
              </a>
              <p className="text-[13px] text-[#94a3b8] mt-[18px] leading-[1.6]">
                Wrong email?{' '}
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="text-[#0D47A1] font-bold bg-transparent border-none cursor-pointer underline text-[13px] p-0"
                >
                  Go back and edit it
                </button>
              </p>
            </div>
          ) : step === 'error' ? (
            <div className="text-center py-4">
              <div className="flex items-center justify-center mb-3">
                <Warning size={40} weight="duotone" color="#f59e0b" />
              </div>
              <h3 className="text-lg font-extrabold text-[#0f172a] mb-2">
                Something went wrong
              </h3>
              <p className="text-[#64748b] text-sm mb-5">{serverError}</p>
              <button
                onClick={() => setStep('form')}
                className="text-[#0D47A1] font-bold text-sm bg-transparent border-none cursor-pointer underline"
              >Try again</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
              <p className="text-sm text-[#64748b] mb-0.5">
                Create your free workspace — no payment required.
              </p>

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

              <button
                type="submit"
                disabled={step === 'submitting'}
                className={`w-full text-white font-extrabold text-[15px] border-none px-5 py-[14px] rounded-full mt-1 transition-colors tracking-[0.01em] ${step === 'submitting' ? 'bg-[#94a3b8] cursor-not-allowed' : 'bg-[#0D47A1] cursor-pointer'}`}
              >
                {step === 'submitting' ? 'Creating your workspace…' : 'Create Free Account →'}
              </button>

              <p className="text-xs text-[#94a3b8] text-center">
                No credit card required · Cancel anytime
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
