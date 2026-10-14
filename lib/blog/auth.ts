import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { randomInt } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { query } from './db';

export type Role = 'admin' | 'writer';

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  mustChangePassword: boolean;
};

const COOKIE = 'kg_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const MAX_FAILED_ATTEMPTS = 5;
const LOCK_MINUTES = 15;
let dummyHash: string | undefined;

function secretKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not configured');
  return new TextEncoder().encode(secret);
}

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
export const generateTempPassword = () => Array.from({ length: 14 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('');

type UserRow = {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  must_change_password: boolean;
  password_hash: string;
  failed_attempts: number;
  locked_until: string | null;
};

export type LoginResult = { ok: true } | { ok: false; error: string };

export async function login(email: string, password: string): Promise<LoginResult> {
  const generic = { ok: false as const, error: 'Incorrect email or password.' };
  const rows = await query<UserRow>('select * from users where email = $1', [email.trim().toLowerCase()]);
  const user = rows[0];
  if (!user || !user.active) {
    // Spend the same time as a real check so timing doesn't reveal which emails exist.
    await bcrypt.compare(password, (dummyHash ??= bcrypt.hashSync('not-a-real-password', 12)));
    return generic;
  }
  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    return { ok: false, error: 'Too many failed attempts. Please try again in a few minutes.' };
  }
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const attempts = user.failed_attempts + 1;
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      await query(`update users set failed_attempts = 0, locked_until = now() + interval '${LOCK_MINUTES} minutes' where id = $1`, [user.id]);
    } else {
      await query('update users set failed_attempts = $2 where id = $1', [user.id, attempts]);
    }
    return generic;
  }
  await query('update users set failed_attempts = 0, locked_until = null where id = $1', [user.id]);
  await startSession(user.id);
  return { ok: true };
}

async function startSession(userId: number) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

/** The signed-in user, re-checked against the database on every request. */
export const getSession = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] });
    const id = Number(payload.sub);
    if (!Number.isInteger(id)) return null;
    const rows = await query<UserRow>('select * from users where id = $1 and active = true', [id]);
    const u = rows[0];
    if (!u) return null;
    return { id: u.id, name: u.name, email: u.email, role: u.role, mustChangePassword: u.must_change_password };
  } catch {
    return null;
  }
});

/** For pages: sends visitors to the login page if not signed in, or to change their temporary password. */
export async function requireUser(options: { allowPasswordChange?: boolean } = {}): Promise<SessionUser> {
  const user = await getSession();
  if (!user) redirect('/admin/login');
  if (user.mustChangePassword && !options.allowPasswordChange) redirect('/admin/change-password');
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== 'admin') redirect('/admin');
  return user;
}

export async function setPassword(userId: number, password: string, mustChange: boolean) {
  const hash = await hashPassword(password);
  await query('update users set password_hash = $2, must_change_password = $3, failed_attempts = 0, locked_until = null where id = $1', [userId, hash, mustChange]);
}

export async function verifyCurrentPassword(userId: number, password: string): Promise<boolean> {
  const rows = await query<{ password_hash: string }>('select password_hash from users where id = $1', [userId]);
  return rows[0] ? bcrypt.compare(password, rows[0].password_hash) : false;
}
