'use client';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { contactSchema, type ContactFields } from '@/lib/schemas/contact';
import { useState } from 'react';
import { CheckCircle } from '@phosphor-icons/react';

const TOPICS = ['Request a Demo', 'Pricing & Plans', 'Technical Question', 'Partnership', 'Other'];

const fieldClass =
  'px-3 py-2.5 border-[1.5px] border-[#e2e8f0] rounded-lg text-sm font-[inherit] text-[#0f172a] outline-none transition-colors bg-white focus-visible:border-[#0D47A1] focus-visible:ring-[3px] focus-visible:ring-[#0D47A1]/10';

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', company: '', phone: '',
      jobTitle: '', topic: '', message: '',
    },
  });

  async function goToStep2() {
    // Step 1 only hard-requires firstName + email, matching the original "Next" guard.
    const ok = await trigger(['firstName', 'email']);
    if (ok) setStep(2);
  }

  async function onValid(fields: ContactFields) {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    const values = getValues();
    return (
      <div className="bg-white rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.18)] p-10 w-full max-w-[480px] text-center py-[60px] px-10">
        <div className="flex items-center justify-center mb-4"><CheckCircle size={48} weight="duotone" color="#16a34a" /></div>
        <h2 className="text-[22px] font-extrabold text-[#0f172a] mb-3">Message sent!</h2>
        <p className="text-[#64748b] text-sm leading-[1.7]">
          Thanks {values.firstName} — our team will get back to you at <strong>{values.email}</strong> within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.18)] p-10 w-full max-w-[480px]">
      <div className="mb-1.5">
        <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-[linear-gradient(90deg,#0D47A1,#3730a3)] rounded-full transition-[width] duration-300"
            style={{ width: step === 1 ? '50%' : '100%' }}
          />
        </div>
        <span className="text-xs text-[#94a3b8] font-medium">Fill out form: Step {step} of 2</span>
      </div>
      <h2 className="text-[22px] font-extrabold text-[#0f172a] mb-6">Connect with sales</h2>
      <form onSubmit={handleSubmit(onValid)}>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">First Name</label>
                <Input className={fieldClass} placeholder="e.g. Anderson" {...register('firstName')} />
                {errors.firstName && <p className="text-[11px] text-[#ef4444]">{errors.firstName.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">Last Name</label>
                <Input className={fieldClass} placeholder="e.g. Mensah" {...register('lastName')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">Email Address</label>
                <Input className={fieldClass} type="email" placeholder="you@company.com" {...register('email')} />
                {errors.email && <p className="text-[11px] text-[#ef4444]">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">Company</label>
                <Input className={fieldClass} placeholder="Your organisation" {...register('company')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">Phone Number</label>
                <Input className={fieldClass} type="tel" placeholder="+233 20 000 0000" {...register('phone')} />
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[13px] font-semibold text-[#374151]">Job Title</label>
                <Input className={fieldClass} placeholder="e.g. Head of CX" {...register('jobTitle')} />
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-[#3730a3] text-white p-[14px] rounded-[10px] text-base font-bold border-none cursor-pointer mt-2 transition-colors hover:bg-[#0D47A1]"
              onClick={goToStep2}
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <div className="flex flex-col gap-[5px] mb-4">
              <label className="text-[13px] font-semibold text-[#374151]">How can we help?</label>
              <Controller
                name="topic"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={`${fieldClass} w-full`}>
                      <SelectValue placeholder="Select a topic…" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="flex flex-col gap-[5px] mb-4">
              <label className="text-[13px] font-semibold text-[#374151]">Message</label>
              <Textarea
                className={`${fieldClass} resize-y min-h-[120px] w-full`}
                placeholder="Tell us about your goals or questions…"
                {...register('message')}
              />
              {errors.message && <p className="text-[11px] text-[#ef4444]">{errors.message.message}</p>}
            </div>
            {status === 'error' && (
              <p className="text-[#dc2626] text-[13px] mb-3">
                Something went wrong. Please try again or email us directly at support@krontiva.africa
              </p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                className="p-[14px] rounded-[10px] text-base font-bold border-none cursor-pointer transition-colors bg-[#e2e8f0] text-[#0f172a] flex-none w-auto px-6"
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="p-[14px] rounded-[10px] text-base font-bold border-none cursor-pointer transition-colors bg-[#3730a3] text-white hover:bg-[#0D47A1] flex-1"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending…' : 'Submit'}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
