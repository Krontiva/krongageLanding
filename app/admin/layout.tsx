import type { Metadata } from 'next';
import Link from 'next/link';
import { getSession } from '@/lib/blog/auth';
import { logoutAction } from './actions';

export const metadata: Metadata = {
  title: 'Staff area – KronGage Blog',
  robots: { index: false, follow: false },
};

const navLink = 'text-sm font-semibold text-[#475569] hover:text-[#0D47A1] transition-colors';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getSession();
  const ready = user && !user.mustChangePassword;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <header className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <Link href={ready ? '/admin' : '/admin/login'} className="text-[15px] font-extrabold text-[#0f172a]">
              KronGage <span className="text-[#0D47A1]">Blog</span>
            </Link>
            {ready && (
              <nav className="flex items-center gap-6 max-[640px]:gap-4">
                <Link href="/admin" className={navLink}>Posts</Link>
                <Link href="/admin/posts/new" className={navLink}>New post</Link>
                {user.role === 'admin' && <Link href="/admin/people" className={navLink}>People</Link>}
              </nav>
            )}
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#64748b] max-[640px]:hidden">
                {user.name} · {user.role === 'admin' ? 'Admin' : 'Writer'}
              </span>
              <form action={logoutAction}>
                <button type="submit" className="text-sm font-semibold text-[#0D47A1] hover:underline">Sign out</button>
              </form>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-[1100px] mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
