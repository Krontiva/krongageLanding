'use client';
import { usePathname } from 'next/navigation';

/** Hides the marketing header/footer on the staff-only /admin pages. */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
