'use client';
import Image from 'next/image';
import PostArticle from '@/components/blog/PostArticle';
import { formatDate, readMinutes } from '@/lib/blog/format';

type Props = {
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  authorName: string;
  /** Post body after the server has cleaned it, exactly as it will be published. */
  html: string;
};

export default function PostPreview({ title, excerpt, category, cover, authorName, html }: Props) {
  const today = new Date().toISOString();
  const shownTitle = title.trim() || 'Untitled post';

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-3">On the blog page</h2>
        <div className="max-w-[360px] bg-[#f8fafc] rounded-2xl overflow-hidden p-3 flex flex-col border border-[#e2e8f0]">
          <div className="w-full h-[190px] rounded-xl overflow-hidden relative bg-[linear-gradient(135deg,#e2e8f0,#f1f5f9)]">
            {cover && <Image src={cover} alt="" fill sizes="360px" className="object-cover" />}
          </div>
          <div className="px-2 pt-4 pb-2">
            <div className="flex items-center gap-2 text-[11px] text-[#94a3b8] font-semibold mb-3 flex-wrap">
              {category && <><span>{category}</span><div className="w-1 h-1 rounded-full bg-[#cbd5e1]" /></>}
              <span>{formatDate(today)}</span>
              <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
              <span>{readMinutes(html)} min read</span>
            </div>
            <h3 className="text-[17px] font-normal text-[#0f172a] leading-[1.35] mb-2">{shownTitle}</h3>
            <p className="text-[13px] text-[#64748b] leading-[1.6]">{excerpt.trim() || 'Your short summary will appear here.'}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-[13px] font-bold uppercase tracking-[1px] text-[#94a3b8] mb-3">The full post</h2>
        <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 max-w-[800px] max-[640px]:p-5">
          <PostArticle
            post={{
              title: shownTitle,
              category,
              cover_image: cover || null,
              content: html,
              author_name: authorName,
              published_at: today,
              created_at: today,
            }}
          />
        </div>
      </section>
    </div>
  );
}
