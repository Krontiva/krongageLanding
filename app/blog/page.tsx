import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { formatDate, listPublished, type Post } from '@/lib/blog/posts';
import { readMinutes } from '@/lib/blog/sanitize';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog – KronGage',
  description: 'Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.',
};

function AuthorRow({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-8 h-8 rounded-full shrink-0 bg-[linear-gradient(135deg,#0D47A1,#1976D2)] flex items-center justify-center text-xs font-extrabold text-white">{name.charAt(0).toUpperCase()}</div>
      <div className="text-[13px] font-bold text-[#0f172a]">{name}</div>
    </div>
  );
}

function Meta({ post, className }: { post: Post; className: string }) {
  return (
    <div className={`flex items-center gap-2 text-[#94a3b8] font-semibold flex-wrap ${className}`}>
      {post.category && <><span>{post.category}</span><div className="w-1 h-1 rounded-full bg-[#cbd5e1]" /></>}
      <span>{formatDate(post.published_at)}</span>
      <div className="w-1 h-1 rounded-full bg-[#cbd5e1]" />
      <span>{readMinutes(post.content)} min read</span>
    </div>
  );
}

function Cover({ src, className, sizes, priority }: { src: string | null; className: string; sizes: string; priority?: boolean }) {
  return (
    <div className={`w-full overflow-hidden relative bg-[linear-gradient(135deg,#e2e8f0,#f1f5f9)] ${className}`}>
      {src && <Image src={src} alt="" fill sizes={sizes} className="object-cover" priority={priority} />}
    </div>
  );
}

export default async function Page() {
  const posts = await listPublished();
  const [featured, ...rest] = posts;

  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-6 pt-32 pb-20 w-full">
      <div className="mb-12">
        <div className="text-xs font-bold text-[#0D47A1] tracking-[1.5px] uppercase mb-3">Insights &amp; Perspectives</div>
        <h1 className="text-[44px] font-normal text-[#0f172a] leading-[1.15] mb-[14px] max-[640px]:text-[30px]">The KronGage Blog</h1>
        <p className="text-[17px] text-[#64748b] max-w-[560px] leading-[1.7]">Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.</p>
      </div>

      {!featured ? (
        <div className="bg-[#f8fafc] rounded-[24px] p-12 text-center max-[640px]:p-6">
          <h2 className="text-[24px] font-normal text-[#0f172a] mb-2">New articles are on the way</h2>
          <p className="text-[15px] text-[#64748b] leading-[1.7]">Check back soon for fresh insights from the KronGage team.</p>
        </div>
      ) : (
        <>
          <Link href={`/blog/${featured.slug}`} className="block bg-[#f8fafc] rounded-[24px] p-6 mb-14 max-[900px]:p-4">
            <div className="grid grid-cols-2 gap-10 items-center max-[900px]:grid-cols-1 max-[900px]:gap-6">
              <Cover src={featured.cover_image} className="h-[420px] rounded-2xl max-[900px]:h-[280px]" sizes="(max-width: 900px) 100vw, 560px" priority />
              <div className="pr-4 max-[900px]:pr-0">
                <Meta post={featured} className="text-[13px] gap-3 mb-4" />
                <h2 className="text-[32px] font-normal text-[#0f172a] leading-[1.2] mb-4 max-[640px]:text-[24px]">{featured.title}</h2>
                <p className="text-[15px] text-[#64748b] leading-[1.7] mb-7">{featured.excerpt}</p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <AuthorRow name={featured.author_name} />
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D47A1] underline underline-offset-4">
                    Read the piece <ArrowUpRight size={15} weight="bold" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {rest.length > 0 && (
            <>
              <div className="text-xs font-bold text-[#94a3b8] tracking-[1px] uppercase mb-6 pb-3 border-b border-[#f1f5f9]">More from the Blog</div>
              <div className="grid grid-cols-3 gap-8 max-[900px]:grid-cols-1">
                {rest.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="bg-[#f8fafc] rounded-2xl overflow-hidden p-3 flex flex-col">
                    <Cover src={post.cover_image} className="h-[190px] rounded-xl" sizes="(max-width: 900px) 100vw, 33vw" />
                    <div className="px-2 pt-4 pb-2 flex flex-col flex-1">
                      <Meta post={post} className="text-[11px] mb-3" />
                      <h3 className="text-[17px] font-normal text-[#0f172a] leading-[1.35] mb-2">{post.title}</h3>
                      <p className="text-[13px] text-[#64748b] leading-[1.6] mb-5">{post.excerpt}</p>
                      <div className="mt-auto pt-1"><AuthorRow name={post.author_name} /></div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
