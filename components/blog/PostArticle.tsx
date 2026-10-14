import Image from 'next/image';
import type { Post } from '@/lib/blog/posts';
import { formatDate, readMinutes } from '@/lib/blog/format';

type Props = {
  post: Pick<Post, 'title' | 'category' | 'cover_image' | 'content' | 'author_name' | 'published_at' | 'created_at'>;
  /** Full public URL of the post; when given, a LinkedIn share button is shown. */
  shareUrl?: string;
};

/** Renders a post. Used on the public blog and for staff previews. Content is sanitised when saved. */
export default function PostArticle({ post, shareUrl }: Props) {
  const date = formatDate(post.published_at ?? post.created_at);
  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center gap-3 text-[13px] text-[#94a3b8] font-semibold mb-4 flex-wrap">
          {post.category && <><span>{post.category}</span><span className="w-1 h-1 rounded-full bg-[#cbd5e1]" /></>}
          <span>{date}</span>
          <span className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
          <span>{readMinutes(post.content)} min read</span>
        </div>
        <h1 className="text-[40px] font-normal text-[#0f172a] leading-[1.2] mb-5 max-[640px]:text-[28px]">{post.title}</h1>
        <div className="flex items-center gap-[10px]">
          <div className="w-9 h-9 rounded-full shrink-0 bg-[linear-gradient(135deg,#0D47A1,#1976D2)] flex items-center justify-center text-xs font-extrabold text-white">
            {post.author_name.charAt(0).toUpperCase()}
          </div>
          <div className="text-[14px] font-bold text-[#0f172a]">{post.author_name}</div>
        </div>
      </header>

      {post.cover_image && (
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden mb-10 max-[640px]:h-[220px]">
          <Image src={post.cover_image} alt="" fill sizes="(max-width: 900px) 100vw, 800px" className="object-cover" priority />
        </div>
      )}

      <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

      {shareUrl && (
        <div className="mt-12 pt-6 border-t border-[#e2e8f0] flex items-center gap-4 flex-wrap">
          <span className="text-sm font-semibold text-[#475569]">Enjoyed this? Share it.</span>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-bold text-white hover:bg-[#004182] transition-colors"
          >
            Share on LinkedIn
          </a>
        </div>
      )}
    </article>
  );
}
