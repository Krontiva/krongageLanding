import type { PostStatus } from '@/lib/blog/posts';
import { STATUS_LABEL } from '@/lib/blog/posts';

export const inputClass =
  'w-full rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2.5 text-[15px] text-[#0f172a] outline-none focus:border-[#0D47A1] focus:ring-2 focus:ring-[#0D47A1]/15';
export const primaryButton =
  'inline-flex items-center justify-center rounded-lg bg-[#0D47A1] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0b3d8a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
export const secondaryButton =
  'inline-flex items-center justify-center rounded-lg border border-[#cbd5e1] bg-white px-5 py-2.5 text-sm font-bold text-[#0f172a] hover:bg-[#f1f5f9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors';
export const dangerButton =
  'inline-flex items-center justify-center rounded-lg border border-[#fecaca] bg-white px-5 py-2.5 text-sm font-bold text-[#b91c1c] hover:bg-[#fef2f2] disabled:opacity-50 transition-colors';

const BADGE: Record<PostStatus, string> = {
  draft: 'bg-[#f1f5f9] text-[#475569]',
  in_review: 'bg-[#fef3c7] text-[#92400e]',
  changes_requested: 'bg-[#ffedd5] text-[#9a3412]',
  published: 'bg-[#dcfce7] text-[#166534]',
};

export function StatusBadge({ status }: { status: PostStatus }) {
  return <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${BADGE[status]}`}>{STATUS_LABEL[status]}</span>;
}

export function Notice({ tone, children }: { tone: 'error' | 'info' | 'success'; children: React.ReactNode }) {
  const styles = {
    error: 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]',
    info: 'bg-[#eff6ff] border-[#bfdbfe] text-[#1e40af]',
    success: 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]',
  }[tone];
  return <div role={tone === 'error' ? 'alert' : 'status'} className={`rounded-lg border px-4 py-3 text-sm ${styles}`}>{children}</div>;
}
