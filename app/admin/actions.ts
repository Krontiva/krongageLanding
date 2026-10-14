'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { query } from '@/lib/blog/db';
import {
  endSession,
  generateTempPassword,
  hashPassword,
  login,
  requireAdmin,
  requireUser,
  setPassword,
  verifyCurrentPassword,
  type Role,
  type SessionUser,
} from '@/lib/blog/auth';
import { getPostById, logEvent, uniqueSlug, type Post } from '@/lib/blog/posts';
import { cleanContent, plainText } from '@/lib/blog/sanitize';

type Result = { ok: true } | { ok: false; error: string };
export type FormState = { error?: string; message?: string; tempPassword?: string; forName?: string } | undefined;

const BLOB_HOST = '.public.blob.vercel-storage.com';

/* ------------------------------ Sign in / out ------------------------------ */

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Enter your email and password.' };
  const result = await login(email, password);
  if (!result.ok) return { error: result.error };
  redirect('/admin');
}

export async function logoutAction() {
  await endSession();
  redirect('/admin/login');
}

export async function changePasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await requireUser({ allowPasswordChange: true });
  const current = String(formData.get('current') ?? '');
  const next = String(formData.get('next') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  if (!(await verifyCurrentPassword(user.id, current))) return { error: 'Your current password is not correct.' };
  if (next.length < 10) return { error: 'Choose a password of at least 10 characters.' };
  if (next !== confirm) return { error: 'The new passwords do not match.' };
  if (next === current) return { error: 'Choose a password different from the current one.' };
  await setPassword(user.id, next, false);
  redirect('/admin');
}

/* --------------------------------- Posts ---------------------------------- */

export type PostInput = {
  id?: number;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  content: string;
};

function canEdit(user: SessionUser, post: Post) {
  if (user.role === 'admin') return true;
  return post.author_id === user.id && (post.status === 'draft' || post.status === 'changes_requested');
}

function refresh(post: { slug: string | null }) {
  revalidatePath('/blog');
  if (post.slug) revalidatePath(`/blog/${post.slug}`);
}

export async function savePost(input: PostInput): Promise<Result & { id?: number }> {
  const user = await requireUser();
  const title = input.title.trim().slice(0, 200);
  const excerpt = input.excerpt.trim().slice(0, 400);
  const category = input.category.trim().slice(0, 60);
  const coverImage = input.coverImage.trim();
  if (input.content.length > 300_000) return { ok: false, error: 'This post is too long.' };
  if (coverImage && !(coverImage.startsWith('https://') && new URL(coverImage).hostname.endsWith(BLOB_HOST))) {
    return { ok: false, error: 'The cover image must be uploaded through the editor.' };
  }
  const content = cleanContent(input.content);

  if (input.id) {
    const post = await getPostById(input.id);
    if (!post) return { ok: false, error: 'That post no longer exists.' };
    if (!canEdit(user, post)) return { ok: false, error: 'You can no longer edit this post.' };
    await query(
      'update posts set title = $2, excerpt = $3, category = $4, cover_image = $5, content = $6, updated_at = now() where id = $1',
      [post.id, title, excerpt, category, coverImage || null, content],
    );
    if (post.status === 'published') refresh(post);
    return { ok: true, id: post.id };
  }

  const rows = await query<{ id: number }>(
    'insert into posts (title, excerpt, category, cover_image, content, author_id) values ($1, $2, $3, $4, $5, $6) returning id',
    [title, excerpt, category, coverImage || null, content, user.id],
  );
  await logEvent(rows[0].id, user.id, 'created');
  return { ok: true, id: rows[0].id };
}

export async function submitForReview(id: number): Promise<Result> {
  const user = await requireUser();
  const post = await getPostById(id);
  if (!post) return { ok: false, error: 'That post no longer exists.' };
  if (post.author_id !== user.id) return { ok: false, error: 'Only the author can submit a post for review.' };
  if (post.status !== 'draft' && post.status !== 'changes_requested') return { ok: false, error: 'This post has already been submitted.' };
  if (post.title.trim().length < 3) return { ok: false, error: 'Add a title before submitting.' };
  if (!post.excerpt.trim()) return { ok: false, error: 'Add a short summary before submitting.' };
  if (plainText(post.content).length < 50) return { ok: false, error: 'Write the post before submitting.' };
  await query("update posts set status = 'in_review', updated_at = now() where id = $1", [id]);
  await logEvent(id, user.id, 'submitted');
  revalidatePath('/admin');
  return { ok: true };
}

export async function approvePost(id: number): Promise<Result> {
  const user = await requireAdmin();
  const post = await getPostById(id);
  if (!post) return { ok: false, error: 'That post no longer exists.' };
  if (post.status !== 'in_review') return { ok: false, error: 'Only posts that are in review can be approved.' };
  if (post.author_id === user.id) return { ok: false, error: 'You cannot approve your own post. Ask another approver.' };
  const slug = post.slug ?? (await uniqueSlug(post.title, post.id));
  await query(
    "update posts set status = 'published', slug = $2, reviewed_by = $3, review_note = null, published_at = coalesce(published_at, now()), updated_at = now() where id = $1",
    [id, slug, user.id],
  );
  await logEvent(id, user.id, 'approved');
  refresh({ slug });
  revalidatePath('/admin');
  return { ok: true };
}

export async function requestChanges(id: number, note: string): Promise<Result> {
  const user = await requireAdmin();
  const text = note.trim().slice(0, 1000);
  if (!text) return { ok: false, error: 'Tell the writer what needs to change.' };
  const post = await getPostById(id);
  if (!post) return { ok: false, error: 'That post no longer exists.' };
  if (post.status !== 'in_review') return { ok: false, error: 'Only posts that are in review can be sent back.' };
  if (post.author_id === user.id) return { ok: false, error: 'You cannot review your own post. Ask another approver.' };
  await query("update posts set status = 'changes_requested', review_note = $2, reviewed_by = $3, updated_at = now() where id = $1", [id, text, user.id]);
  await logEvent(id, user.id, 'changes_requested', text);
  revalidatePath('/admin');
  return { ok: true };
}

export async function unpublishPost(id: number): Promise<Result> {
  const user = await requireAdmin();
  const post = await getPostById(id);
  if (!post || post.status !== 'published') return { ok: false, error: 'That post is not published.' };
  await query("update posts set status = 'draft', updated_at = now() where id = $1", [id]);
  await logEvent(id, user.id, 'unpublished');
  refresh(post);
  revalidatePath('/admin');
  return { ok: true };
}

export async function deletePost(id: number): Promise<Result> {
  const user = await requireUser();
  const post = await getPostById(id);
  if (!post) return { ok: true };
  const allowed = user.role === 'admin' || (post.author_id === user.id && post.status !== 'published' && post.status !== 'in_review');
  if (!allowed) return { ok: false, error: 'You cannot delete this post.' };
  await query('delete from posts where id = $1', [id]);
  refresh(post);
  revalidatePath('/admin');
  return { ok: true };
}

/* --------------------------------- People --------------------------------- */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function adminCount() {
  const rows = await query<{ n: string }>("select count(*) as n from users where role = 'admin' and active = true");
  return Number(rows[0].n);
}

export async function createUserAction(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const role: Role = formData.get('role') === 'admin' ? 'admin' : 'writer';
  if (!name) return { error: 'Enter a name.' };
  if (!EMAIL.test(email)) return { error: 'Enter a valid email address.' };
  const exists = await query('select 1 from users where email = $1', [email]);
  if (exists.length) return { error: 'Someone with that email already has an account.' };
  const tempPassword = generateTempPassword();
  await query('insert into users (name, email, password_hash, role, must_change_password) values ($1, $2, $3, $4, true)', [
    name,
    email,
    await hashPassword(tempPassword),
    role,
  ]);
  revalidatePath('/admin/people');
  return { message: `Account created for ${name}.`, tempPassword, forName: name };
}

export async function setRoleAction(userId: number, role: Role): Promise<Result> {
  const me = await requireAdmin();
  if (userId === me.id) return { ok: false, error: 'You cannot change your own role.' };
  await query('update users set role = $2 where id = $1', [userId, role]);
  if ((await adminCount()) < 1) {
    await query("update users set role = 'admin' where id = $1", [me.id]);
    return { ok: false, error: 'There must be at least one admin.' };
  }
  revalidatePath('/admin/people');
  return { ok: true };
}

export async function setActiveAction(userId: number, active: boolean): Promise<Result> {
  const me = await requireAdmin();
  if (userId === me.id) return { ok: false, error: 'You cannot deactivate your own account.' };
  await query('update users set active = $2 where id = $1', [userId, active]);
  if ((await adminCount()) < 1) {
    await query('update users set active = true where id = $1', [userId]);
    return { ok: false, error: 'There must be at least one active admin.' };
  }
  revalidatePath('/admin/people');
  return { ok: true };
}

export async function resetPasswordAction(userId: number): Promise<Result & { tempPassword?: string }> {
  await requireAdmin();
  const tempPassword = generateTempPassword();
  await setPassword(userId, tempPassword, true);
  return { ok: true, tempPassword };
}
