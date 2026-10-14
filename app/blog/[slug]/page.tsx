import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedBySlug } from '@/lib/blog/posts';
import PostArticle from '@/components/blog/PostArticle';
import { SITE_URL as SITE } from '@/lib/blog/site';

export const revalidate = 300;

async function load(slug: string) {
  try {
    return await getPublishedBySlug(slug);
  } catch (err) {
    console.error('[blog] could not load post', slug, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) return { title: 'Post not found – KronGage' };
  return {
    title: `${post.title} – KronGage`,
    description: post.excerpt || undefined,
    alternates: { canonical: `${SITE}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt || undefined,
      url: `${SITE}/blog/${post.slug}`,
      images: post.cover_image ? [post.cover_image] : undefined,
      publishedTime: post.published_at ?? undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await load(slug);
  if (!post) notFound();

  return (
    <main className="max-w-[800px] mx-auto px-6 pt-32 pb-20 w-full">
      <nav aria-label="Breadcrumb" className="text-[13px] text-[#64748b] mb-8">
        <Link href="/" className="hover:text-[#0D47A1]">Home</Link>
        <span className="mx-[6px]">›</span>
        <Link href="/blog" className="hover:text-[#0D47A1]">Blog</Link>
      </nav>
      <PostArticle post={post} shareUrl={`${SITE}/blog/${post.slug}`} />
      <div className="mt-12">
        <Link href="/blog" className="text-sm font-bold text-[#0D47A1] underline underline-offset-4">← Back to the blog</Link>
      </div>
    </main>
  );
}
