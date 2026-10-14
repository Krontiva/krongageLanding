import { redirect } from 'next/navigation';
import { getSession } from '@/lib/blog/auth';
import LoginForm from './LoginForm';

export default async function Page() {
  const user = await getSession();
  if (user) redirect(user.mustChangePassword ? '/admin/change-password' : '/admin');

  return (
    <div className="max-w-[400px] mx-auto pt-10">
      <h1 className="text-[28px] font-normal text-[#0f172a] mb-2">Staff sign in</h1>
      <p className="text-[15px] text-[#64748b] mb-8">Sign in to write and manage KronGage blog posts.</p>
      <LoginForm />
    </div>
  );
}
