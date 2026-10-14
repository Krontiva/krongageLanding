import { SITE_URL } from './site';

export type FeedPost = {
  title: string;
  slug: string | null;
  excerpt: string;
  category: string;
  cover_image: string | null;
  content: string;
  author_name: string;
  published_at: string | null;
};

const FEED_TITLE = 'The KronGage Blog';
const FEED_DESCRIPTION = 'Strategies, research, and expert insights on customer engagement, retention, and AI-powered growth.';

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

// Wraps text in CDATA; a literal "]]>" inside the text would end it early, so split it.
const cdata = (value: string) => `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;

const IMAGE_TYPES: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };

function imageType(url: string): string {
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase() ?? '';
  return IMAGE_TYPES[ext] ?? 'image/jpeg';
}

function item(post: FeedPost): string {
  const link = `${SITE_URL}/blog/${post.slug}`;
  const date = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
  const lines = [
    '<item>',
    `<title>${escapeXml(post.title)}</title>`,
    `<link>${escapeXml(link)}</link>`,
    `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
    `<pubDate>${date}</pubDate>`,
    `<dc:creator>${escapeXml(post.author_name)}</dc:creator>`,
  ];
  if (post.category) lines.push(`<category>${escapeXml(post.category)}</category>`);
  lines.push(`<description>${escapeXml(post.excerpt)}</description>`);
  if (post.cover_image) {
    lines.push(`<media:content url="${escapeXml(post.cover_image)}" medium="image" type="${imageType(post.cover_image)}" />`);
    lines.push(`<enclosure url="${escapeXml(post.cover_image)}" type="${imageType(post.cover_image)}" length="0" />`);
  }
  lines.push(`<content:encoded>${cdata(post.content)}</content:encoded>`);
  lines.push('</item>');
  return lines.join('\n');
}

/** Builds an RSS 2.0 feed from published posts, newest first. */
export function buildFeed(posts: FeedPost[]): string {
  const published = posts.filter((p) => p.slug);
  const updated = published[0]?.published_at ? new Date(published[0].published_at) : new Date();
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">',
    '<channel>',
    `<title>${escapeXml(FEED_TITLE)}</title>`,
    `<link>${SITE_URL}/blog</link>`,
    `<description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    '<language>en</language>',
    `<lastBuildDate>${updated.toUTCString()}</lastBuildDate>`,
    `<atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
    ...published.map(item),
    '</channel>',
    '</rss>',
    '',
  ].join('\n');
}
