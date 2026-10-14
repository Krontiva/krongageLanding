'use client';
import { useActionState } from 'react';
import { changePasswordAction } from '../actions';
import { inputClass, Notice, primaryButton } from '@/components/admin/FormBits';

export default function ChangePasswordForm() {
  const [state, action, pending] = useActionState(changePasswordAction, undefined);
  return (
    <form action={action} className="space-y-4">
      {state?.error && <Notice tone="error">{state.error}</Notice>}
      <div>
        <label htmlFor="current" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Current password</label>
        <input id="current" name="current" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="next" className="block text-sm font-semibold text-[#0f172a] mb-1.5">New password</label>
        <input id="next" name="next" type="password" autoComplete="new-password" minLength={10} required className={inputClass} />
      </div>
      <div>
        <label htmlFor="confirm" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Confirm new password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={10} required className={inputClass} />
      </div>
      <button type="submit" disabled={pending} className={`${primaryButton} w-full`}>
        {pending ? 'Saving…' : 'Save password'}
      </button>
    </form>
  );
}
