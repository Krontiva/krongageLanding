import Link from 'next/link';
import { requireUser } from '@/lib/blog/auth';
import { formatDate, listAllPosts, listInReview, listPostsByAuthor, type Post } from '@/lib/blog/posts';
import { primaryButton, StatusBadge } from '@/components/admin/FormBits';

function PostRow({ post, showAuthor }: { post: Post; showAuthor?: boolean }) {
  return (
    <li>
      <Link href={`/admin/posts/${post.id}`} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#f8fafc] transition-colors">
        <div className="min-w-0">
          <div className="font-semibold text-[#0f172a] truncate">{post.title || 'Untitled post'}</div>
          <div className="text-[13px] text-[#64748b] mt-0.5">
            {showAuthor && <>{post.author_name} · </>}
            Updated {formatDate(post.updated_at)}
          </div>
        </div>
        <StatusBadge status={post.status} />
      </Link>
    </li>
  );
}

function Section({ title, hint, posts, showAuthor, empty }: { title: string; hint?: string; posts: Post[]; showAuthor?: boolean; empty: string }) {
  return (
    <section className="mb-10">
      <h2 className="text-[19px] font-bold text-[#0f172a]">{title}</h2>
      {hint && <p className="text-sm text-[#64748b] mt-1">{hint}</p>}
      <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-white overflow-hidden">
        {posts.length ? (
          <ul className="divide-y divide-[#f1f5f9]">{posts.map((p) => <PostRow key={p.id} post={p} showAuthor={showAuthor} />)}</ul>
        ) : (
          <p className="px-5 py-6 text-sm text-[#64748b]">{empty}</p>
        )}
      </div>
    </section>
  );
}

export default async function Page() {
  const user = await requireUser();
  const isAdmin = user.role === 'admin';
  const [mine, queue, all] = await Promise.all([
    listPostsByAuthor(user.id),
    isAdmin ? listInReview() : Promise.resolve([]),
    isAdmin ? listAllPosts() : Promise.resolve([]),
  ]);

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-10">
        <div>
          <h1 className="text-[30px] font-normal text-[#0f172a]">Hello, {user.name.split(' ')[0]}</h1>
          <p className="text-[15px] text-[#64748b] mt-1">
            {isAdmin ? 'Publish your own posts directly, and review what your team submits.' : 'Write a post and submit it for review when it is ready.'}
          </p>
        </div>
        <Link href="/admin/posts/new" className={primaryButton}>Write a new post</Link>
      </div>

      {isAdmin && (
        <Section
          title="Waiting for review"
          hint="Open a post to read it, then approve it or send it back with notes."
          posts={queue}
          showAuthor
          empty="Nothing is waiting for review."
        />
      )}
      <Section title="My posts" posts={mine} empty="You have not written anything yet." />
      {isAdmin && <Section title="All posts" posts={all} showAuthor empty="No posts yet." />}
    </>
  );
}
