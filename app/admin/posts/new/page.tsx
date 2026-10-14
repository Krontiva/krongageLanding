import Link from 'next/link';
import { requireUser } from '@/lib/blog/auth';
import PostEditor from '@/components/admin/PostEditor';

export default async function Page() {
  await requireUser();
  return (
    <>
      <Link href="/admin" className="text-sm font-semibold text-[#0D47A1] hover:underline">← Back to posts</Link>
      <h1 className="text-[30px] font-normal text-[#0f172a] mt-3 mb-8">New post</h1>
      <PostEditor isAuthor />
    </>
  );
}
