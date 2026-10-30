'use client';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost, publishPost, requestChanges, unpublishPost } from '@/app/admin/actions';
import { dangerButton, inputClass, Notice, primaryButton, secondaryButton } from './FormBits';

type Props = {
  postId: number;
  title: string;
  status: 'draft' | 'changes_requested' | 'in_review' | 'published';
  /** True when the signed-in admin wrote this post. */
  isOwn: boolean;
  authorName: string;
  /** True if the post has been live before (so publishing it again is a republish). */
  wasPublished: boolean;
};

const card = 'rounded-xl border border-[#e2e8f0] bg-white p-5';

export default function ReviewPanel({ postId, title, status, isOwn, authorName, wasPublished }: Props) {
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

  /* ---------------------------- Live post ---------------------------- */
  if (status === 'published') {
    return (
      <div className={card}>
        {error && <div className="mb-3"><Notice tone="error">{error}</Notice></div>}
        <p className="text-sm text-[#475569] mb-3">
          This post is live on the blog. <strong>Unpublish</strong> hides it and returns it to draft, and you can publish it again at any time.{' '}
          <strong>Delete</strong> removes it for good.
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" className={secondaryButton} disabled={pending} onClick={() => {
            if (window.confirm('Take this post off the website? You can publish it again later.')) run(() => unpublishPost(postId));
          }}>
            Unpublish
          </button>
          <button type="button" className={dangerButton} disabled={pending} onClick={() => {
            const label = title.trim() || 'this post';
            if (window.confirm(`Permanently delete "${label}"?\n\nIt will be removed from the website and cannot be recovered. If you only want to hide it, use Unpublish instead.`)) {
              run(() => deletePost(postId), () => router.push('/admin'));
            }
          }}>
            Delete permanently
          </button>
        </div>
      </div>
    );
  }

  /* ------------- A writer's submission waiting for approval ------------- */
  if (status === 'in_review' && !isOwn) {
    return (
      <div className={card}>
        <h2 className="text-[17px] font-bold text-[#0f172a] mb-1">Review this post</h2>
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
            <button type="button" className={primaryButton} disabled={pending} onClick={() => run(() => publishPost(postId), () => router.push(`/admin/posts/${postId}`))}>
              {pending ? 'Working…' : 'Approve and publish'}
            </button>
            <button type="button" className={secondaryButton} disabled={pending} onClick={() => setAsking(true)}>Request changes</button>
          </div>
        )}
      </div>
    );
  }

  /* ------- Everything else: the admin publishes directly, no review ------- */
  const intro = wasPublished
    ? 'This post was live before. Publish it again to put it back on the website.'
    : isOwn
      ? 'As an admin you publish your own posts directly. No review is needed.'
      : status === 'in_review'
        ? 'This post is waiting for review.'
        : `This post is still a ${status === 'changes_requested' ? 'draft with changes requested' : 'draft'}. Publish it, or open it for editing first.`;

  return (
    <div className={card}>
      <h2 className="text-[17px] font-bold text-[#0f172a] mb-1">{wasPublished ? 'Republish this post' : 'Publish this post'}</h2>
      <p className="text-sm text-[#475569] mb-4">{intro}</p>
      {error && <div className="mb-3"><Notice tone="error">{error}</Notice></div>}
      <button
        type="button"
        className={primaryButton}
        disabled={pending}
        onClick={() => {
          const label = title.trim() || 'this post';
          const warning = !isOwn && status !== 'in_review' && !wasPublished
            ? `\n\n${authorName} has not submitted this post for review yet. Publish it anyway?`
            : '';
          if (window.confirm(`Publish "${label}" to the website now?${warning}`)) {
            run(() => publishPost(postId), () => router.push(`/admin/posts/${postId}`));
          }
        }}
      >
        {pending ? 'Publishing…' : wasPublished ? 'Republish' : 'Publish now'}
      </button>
    </div>
  );
}
