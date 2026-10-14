'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { approvePost, requestChanges, unpublishPost } from '@/app/admin/actions';
import { inputClass, Notice, primaryButton, secondaryButton } from './FormBits';

type Props = {
  postId: number;
  status: 'in_review' | 'published';
  /** Why this person can't review the post, if they can't (for example, they wrote it). */
  blockedReason?: string;
};

export default function ReviewPanel({ postId, status, blockedReason }: Props) {
  const router = useRouter();
  const [note, setNote] = useState('');
  const [asking, setAsking] = useState(false);
  const [error, setError] = useState('');
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<{ ok: boolean; error?: string }>, after?: () => void) {
    setError('');
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setError(result.error ?? 'Something went wrong.');
        return;
      }
      after?.();
      router.refresh();
    });
  }

  if (status === 'published') {
    return (
      <div className="rounded-xl border border-[#e2e8f0] bg-white p-5">
        {error && <div className="mb-3"><Notice tone="error">{error}</Notice></div>}
        <p className="text-sm text-[#475569] mb-3">This post is live on the blog. Unpublishing returns it to draft so it can be edited and reviewed again.</p>
        <button type="button" className={secondaryButton} disabled={pending} onClick={() => {
          if (window.confirm('Take this post off the website?')) run(() => unpublishPost(postId));
        }}>
          Unpublish
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#e2e8f0] bg-white p-5">
      <h2 className="text-[17px] font-bold text-[#0f172a] mb-1">Review this post</h2>
      {blockedReason ? (
        <p className="text-sm text-[#475569]">{blockedReason}</p>
      ) : (
        <>
          <p className="text-sm text-[#475569] mb-4">Approving publishes the post to the website immediately.</p>
          {error && <div className="mb-3"><Notice tone="error">{error}</Notice></div>}
          {asking ? (
            <div className="space-y-3">
              <label htmlFor="note" className="block text-sm font-semibold text-[#0f172a]">What should the writer change?</label>
              <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={4} maxLength={1000} className={inputClass} />
              <div className="flex gap-3">
                <button type="button" className={primaryButton} disabled={pending || !note.trim()} onClick={() => run(() => requestChanges(postId, note), () => router.push('/admin'))}>
                  Send back to writer
                </button>
                <button type="button" className={secondaryButton} disabled={pending} onClick={() => setAsking(false)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button type="button" className={primaryButton} disabled={pending} onClick={() => run(() => approvePost(postId), () => router.push('/admin'))}>
                {pending ? 'Working…' : 'Approve and publish'}
              </button>
              <button type="button" className={secondaryButton} disabled={pending} onClick={() => setAsking(true)}>Request changes</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
