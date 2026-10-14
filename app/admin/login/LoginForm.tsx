'use client';
import { useActionState } from 'react';
import { loginAction } from '../actions';
import { inputClass, Notice, primaryButton } from '@/components/admin/FormBits';

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);
  return (
    <form action={action} className="space-y-4">
      {state?.error && <Notice tone="error">{state.error}</Notice>}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className={inputClass} />
      </div>
      <button type="submit" disabled={pending} className={`${primaryButton} w-full`}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
      <p className="text-xs text-[#94a3b8]">Forgotten your password? Ask an admin to reset it for you.</p>
    </form>
  );
}
