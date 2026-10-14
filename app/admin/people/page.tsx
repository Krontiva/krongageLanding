import { requireAdmin } from '@/lib/blog/auth';
import { query } from '@/lib/blog/db';
import PeoplePanel, { type Person } from '@/components/admin/PeoplePanel';

export default async function Page() {
  const me = await requireAdmin();
  const people = await query<Person>('select id, name, email, role, active from users order by active desc, role asc, name asc');
  return (
    <>
      <h1 className="text-[30px] font-normal text-[#0f172a] mb-2">People</h1>
      <p className="text-[15px] text-[#64748b] mb-8">
        Everyone can write posts. Admins can also review, approve and publish them.
      </p>
      <PeoplePanel people={people} myId={me.id} />
    </>
  );
}
