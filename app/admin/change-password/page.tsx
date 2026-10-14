import { requireUser } from '@/lib/blog/auth';
import ChangePasswordForm from './ChangePasswordForm';

export default async function Page() {
  const user = await requireUser({ allowPasswordChange: true });
  return (
    <div className="max-w-[420px] mx-auto pt-10">
      <h1 className="text-[28px] font-normal text-[#0f172a] mb-2">
        {user.mustChangePassword ? 'Choose your own password' : 'Change password'}
      </h1>
      <p className="text-[15px] text-[#64748b] mb-8">
        {user.mustChangePassword
          ? 'You signed in with a temporary password. Set a new one to continue.'
          : 'Use at least 10 characters.'}
      </p>
      <ChangePasswordForm />
    </div>
  );
}
