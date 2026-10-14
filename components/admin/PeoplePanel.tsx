'use client';
import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createUserAction, resetPasswordAction, setActiveAction, setRoleAction } from '@/app/admin/actions';
import { inputClass, Notice, primaryButton, secondaryButton } from './FormBits';

export type Person = { id: number; name: string; email: string; role: 'admin' | 'writer'; active: boolean };

function TempPassword({ name, password, onDone }: { name: string; password: string; onDone: () => void }) {
  return (
    <Notice tone="success">
      <p className="font-semibold mb-1">Temporary password for {name}</p>
      <code className="block rounded bg-white px-3 py-2 text-[15px] tracking-wide select-all">{password}</code>
      <p className="mt-2">Send it to them privately. It is shown only once, and they will be asked to choose their own password when they sign in.</p>
      <button type="button" onClick={onDone} className="mt-2 font-bold underline">Done</button>
    </Notice>
  );
}

export default function PeoplePanel({ people, myId }: { people: Person[]; myId: number }) {
  const router = useRouter();
  const [state, action, pending] = useActionState(createUserAction, undefined);
  const [error, setError] = useState('');
  const [revealed, setRevealed] = useState<{ name: string; password: string } | null>(null);
  const [busy, startTransition] = useTransition();

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError('');
    startTransition(async () => {
      const result = await fn();
      if (!result.ok) setError(result.error ?? 'Something went wrong.');
      router.refresh();
    });
  }

  function reset(person: Person) {
    if (!window.confirm(`Reset the password for ${person.name}? Their current password will stop working.`)) return;
    setError('');
    startTransition(async () => {
      const result = await resetPasswordAction(person.id);
      if (result.ok && result.tempPassword) setRevealed({ name: person.name, password: result.tempPassword });
      else setError(('error' in result && result.error) || 'Something went wrong.');
    });
  }

  return (
    <div className="space-y-10">
      {error && <Notice tone="error">{error}</Notice>}
      {revealed && <TempPassword name={revealed.name} password={revealed.password} onDone={() => setRevealed(null)} />}

      <div className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden">
        <ul className="divide-y divide-[#f1f5f9]">
          {people.map((p) => (
            <li key={p.id} className={`flex items-center justify-between gap-4 px-5 py-4 flex-wrap ${p.active ? '' : 'opacity-60'}`}>
              <div className="min-w-0">
                <div className="font-semibold text-[#0f172a]">{p.name}{p.id === myId && <span className="ml-2 text-xs font-bold text-[#64748b]">(you)</span>}</div>
                <div className="text-[13px] text-[#64748b]">{p.email}{!p.active && ' · Deactivated'}</div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  aria-label={`Role for ${p.name}`}
                  value={p.role}
                  disabled={busy || p.id === myId}
                  onChange={(e) => run(() => setRoleAction(p.id, e.target.value as 'admin' | 'writer'))}
                  className="rounded-lg border border-[#cbd5e1] bg-white px-3 py-2 text-sm font-semibold"
                >
                  <option value="writer">Writer</option>
                  <option value="admin">Admin (can approve)</option>
                </select>
                <button type="button" className={secondaryButton} disabled={busy} onClick={() => reset(p)}>Reset password</button>
                {p.id !== myId && (
                  <button type="button" className={secondaryButton} disabled={busy} onClick={() => run(() => setActiveAction(p.id, !p.active))}>
                    {p.active ? 'Deactivate' : 'Reactivate'}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section>
        <h2 className="text-[19px] font-bold text-[#0f172a] mb-4">Add someone</h2>
        <form action={action} className="rounded-xl border border-[#e2e8f0] bg-white p-5 grid grid-cols-[1fr_1fr_200px_auto] gap-4 items-end max-[900px]:grid-cols-1">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Name</label>
            <input id="name" name="name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Email</label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Role</label>
            <select id="role" name="role" defaultValue="writer" className={inputClass}>
              <option value="writer">Writer</option>
              <option value="admin">Admin (can approve)</option>
            </select>
          </div>
          <button type="submit" disabled={pending} className={primaryButton}>{pending ? 'Adding…' : 'Add person'}</button>
        </form>
        {state?.error && <div className="mt-4"><Notice tone="error">{state.error}</Notice></div>}
        {state?.tempPassword && state.forName && (
          <div className="mt-4">
            <TempPassword name={state.forName} password={state.tempPassword} onDone={() => router.refresh()} />
          </div>
        )}
      </section>
    </div>
  );
}
