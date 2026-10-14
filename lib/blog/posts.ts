import { query } from './db';

export type PostStatus = 'draft' | 'in_review' | 'changes_requested' | 'published';

export type Post = {
  id: number;
  slug: string | null;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string | null;
  content: string;
  status: PostStatus;
  author_id: number;
  author_name: string;
  reviewed_by: number | null;
  review_note: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const SELECT = `select p.*, u.name as author_name from posts p join users u on u.id = p.author_id`;

export const STATUS_LABEL: Record<PostStatus, string> = {
  draft: 'Draft',
  in_review: 'In review',
  changes_requested: 'Changes requested',
  published: 'Published',
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'post';
}

/** Returns a slug that no other post is using. */
export async function uniqueSlug(title: string, postId: number): Promise<string> {
  const base = slugify(title);
  let candidate = base;
  for (let i = 2; ; i++) {
    const taken = await query('select 1 from posts where slug = $1 and id <> $2', [candidate, postId]);
    if (!taken.length) return candidate;
    candidate = `${base}-${i}`;
  }
}

export async function getPostById(id: number): Promise<Post | null> {
  const rows = await query<Post>(`${SELECT} where p.id = $1`, [id]);
  return rows[0] ?? null;
}

export async function listPostsByAuthor(authorId: number): Promise<Post[]> {
  return query<Post>(`${SELECT} where p.author_id = $1 order by p.updated_at desc`, [authorId]);
}

export async function listAllPosts(): Promise<Post[]> {
  return query<Post>(`${SELECT} order by p.updated_at desc`);
}

export async function listInReview(): Promise<Post[]> {
  return query<Post>(`${SELECT} where p.status = 'in_review' order by p.updated_at asc`);
}

export async function listPublished(): Promise<Post[]> {
  try {
    return await query<Post>(`${SELECT} where p.status = 'published' order by p.published_at desc`);
  } catch (err) {
    console.error('[blog] could not load published posts', err);
    return [];
  }
}

export async function getPublishedBySlug(slug: string): Promise<Post | null> {
  const rows = await query<Post>(`${SELECT} where p.slug = $1 and p.status = 'published'`, [slug]);
  return rows[0] ?? null;
}

export async function logEvent(postId: number, userId: number, action: string, note?: string | null) {
  await query('insert into post_events (post_id, user_id, action, note) values ($1, $2, $3, $4)', [postId, userId, action, note ?? null]);
}

export type PostEvent = { id: number; action: string; note: string | null; created_at: string; user_name: string | null };

export async function listEvents(postId: number): Promise<PostEvent[]> {
  return query<PostEvent>(
    `select e.id, e.action, e.note, e.created_at, u.name as user_name
     from post_events e left join users u on u.id = e.user_id
     where e.post_id = $1 order by e.created_at desc`,
    [postId],
  );
}

export { formatDate } from './format';
