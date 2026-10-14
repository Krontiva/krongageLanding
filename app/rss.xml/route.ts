import { listPublished } from '@/lib/blog/posts';
import { buildFeed } from '@/lib/blog/rss';

export const revalidate = 300;

const MAX_ITEMS = 20;

export async function GET() {
  const posts = (await listPublished()).slice(0, MAX_ITEMS);
  return new Response(buildFeed(posts), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  });
}
