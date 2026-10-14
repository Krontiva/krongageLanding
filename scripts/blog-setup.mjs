// One-off setup for the blog database: creates the tables and the first accounts.
//
// Runs at the start of `npm run build`, but ONLY when BLOG_SETUP=1 is set, so normal
// and production builds skip it completely. It only ever creates things that do not
// exist yet, and it never fails the build: problems are logged as warnings.
//
// Accounts are created only when BLOG_SEED_PASSWORD (10+ characters) is also set.
// Everyone created this way must choose their own password at first sign-in.
import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

const log = (msg) => console.log(`[blog-setup] ${msg}`);

if (process.env.BLOG_SETUP !== '1') {
  process.exit(0);
}

const FIRST_ACCOUNTS = [
  { name: 'Micky Symons', email: 'micky@krontiva.africa', role: 'admin' },
  { name: 'Mary Arthur', email: 'mary@krontiva.africa', role: 'admin' },
  { name: 'Samuel Quartey', email: 'samuel@krontiva.africa', role: 'writer' },
  { name: 'Nana Yaw Israel', email: 'nanayaw@krontiva.africa', role: 'writer' },
];

const TABLES = [
  `create table if not exists users (
    id serial primary key,
    name text not null,
    email text not null unique,
    password_hash text not null,
    role text not null default 'writer' check (role in ('admin', 'writer')),
    active boolean not null default true,
    must_change_password boolean not null default true,
    failed_attempts integer not null default 0,
    locked_until timestamptz,
    created_at timestamptz not null default now()
  )`,
  `create table if not exists posts (
    id serial primary key,
    slug text unique,
    title text not null default '',
    excerpt text not null default '',
    category text not null default '',
    cover_image text,
    content text not null default '',
    status text not null default 'draft'
      check (status in ('draft', 'in_review', 'changes_requested', 'published')),
    author_id integer not null references users(id),
    reviewed_by integer references users(id),
    review_note text,
    published_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create table if not exists post_events (
    id serial primary key,
    post_id integer not null references posts(id) on delete cascade,
    user_id integer references users(id),
    action text not null,
    note text,
    created_at timestamptz not null default now()
  )`,
  `create index if not exists posts_status_published_idx on posts (status, published_at desc)`,
  `create index if not exists posts_author_idx on posts (author_id)`,
];

try {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not available in this environment');
  const sql = neon(url);

  for (const statement of TABLES) await sql.query(statement);
  log('Blog tables are ready.');

  const seedPassword = process.env.BLOG_SEED_PASSWORD;
  if (!seedPassword) {
    log('BLOG_SEED_PASSWORD not set: no accounts created.');
  } else if (seedPassword.length < 10) {
    log('BLOG_SEED_PASSWORD must be at least 10 characters: no accounts created.');
  } else {
    const hash = await bcrypt.hash(seedPassword, 12);
    for (const u of FIRST_ACCOUNTS) {
      const created = await sql.query(
        `insert into users (name, email, password_hash, role, must_change_password)
         values ($1, $2, $3, $4, true)
         on conflict (email) do nothing
         returning id`,
        [u.name, u.email, hash, u.role],
      );
      log(created.length ? `Created ${u.email} (${u.role}).` : `Kept existing ${u.email}.`);
    }
  }
} catch (err) {
  log(`WARNING: setup did not complete (${err instanceof Error ? err.message : err}). The build will continue.`);
}
process.exit(0);
