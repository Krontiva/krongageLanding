import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requireUser } from '@/lib/blog/auth';
import { formatDate, getPostById, listEvents } from '@/lib/blog/posts';
import PostEditor from '@/components/admin/PostEditor';
import ReviewPanel from '@/components/admin/ReviewPanel';
import PostArticle from '@/components/blog/PostArticle';
import { Notice, secondaryButton, StatusBadge } from '@/components/admin/FormBits';

const ACTION_LABEL: Record<string, string> = {
  created: 'created the post',
  submitted: 'submitted it for review',
  approved: 'approved and published it',
  changes_requested: 'asked for changes',
  unpublished: 'unpublished it',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const { edit } = await searchParams;
  const postId = Number(id);
  if (!Number.isInteger(postId)) notFound();

  const post = await getPostById(postId);
  if (!post) notFound();

  const isAdmin = user.role === 'admin';
  const isAuthor = post.author_id === user.id;
  // Writers see only their own posts; admins can open any post.
  if (!isAdmin && !isAuthor) notFound();

  const authorCanEdit = isAuthor && (post.status === 'draft' || post.status === 'changes_requested');
  const canEdit = isAdmin || authorCanEdit;
  const showEditor = canEdit && (authorCanEdit || edit === '1');
  const events = await listEvents(post.id);

  const reviewBlocked = isAuthor ? 'You wrote this post, so another approver needs to review it.' : undefined;

  return (
    <>
      <Link href="/admin" className="text-sm font-semibold text-[#0D47A1] hover:underline">← Back to posts</Link>
      <div className="flex items-center gap-3 mt-3 mb-8 flex-wrap">
        <h1 className="text-[30px] font-normal text-[#0f172a]">{showEditor ? 'Edit post' : post.title || 'Untitled post'}</h1>
        <StatusBadge status={post.status} />
      </div>

      {showEditor ? (
        <PostEditor post={post} isAuthor={isAuthor} />
      ) : (
        <div className="grid grid-cols-[1fr_320px] gap-10 max-[900px]:grid-cols-1">
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 max-[640px]:p-5">
            <PostArticle post={post} />
          </div>
          <aside className="space-y-5">
            {!isAdmin && post.status === 'in_review' && <Notice tone="info">Submitted for review. You will be able to edit again if changes are requested.</Notice>}
            {!isAdmin && post.status === 'published' && <Notice tone="success">This post is live on the blog.</Notice>}
            {isAdmin && (post.status === 'in_review' || post.status === 'published') && (
              <ReviewPanel postId={post.id} title={post.title} status={post.status} blockedReason={post.status === 'in_review' ? reviewBlocked : undefined} />
            )}
            {canEdit && (
              <Link href={`/admin/posts/${post.id}?edit=1`} className={`${secondaryButton} w-full`}>Edit this post</Link>
            )}
            {post.status === 'published' && post.slug && (
              <Link href={`/blog/${post.slug}`} className="block text-sm font-semibold text-[#0D47A1] hover:underline">View on the website →</Link>
            )}
          </aside>
        </div>
      )}

      {events.length > 0 && (
        <section className="mt-12">
          <h2 className="text-[17px] font-bold text-[#0f172a] mb-3">History</h2>
          <ul className="space-y-2">
            {events.map((e) => (
              <li key={e.id} className="text-sm text-[#475569]">
                <span className="font-semibold text-[#0f172a]">{e.user_name ?? 'Someone'}</span> {ACTION_LABEL[e.action] ?? e.action}
                <span className="text-[#94a3b8]"> · {formatDate(e.created_at)}</span>
                {e.note && <div className="mt-1 ml-4 border-l-2 border-[#e2e8f0] pl-3 text-[#64748b]">{e.note}</div>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
