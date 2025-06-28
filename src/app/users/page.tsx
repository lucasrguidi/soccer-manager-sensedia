import { getUserListData } from '@/services/get-user-list-data';
import { UsersTable } from './_components/users-table';
import { usersTableColumns } from './_components/users-table-columns';
import HelpBanner from '@/components/help-banner';
import RegisterUserForm from './_components/register-user-form';
import UserSummary from '@/components/user-summary';

export default async function UsersPage() {
  const data = await getUserListData();

  return (
    <>
      <UserSummary />
      <div className="max-w-5xl flex flex-col mx-auto py-8 gap-8">
        <h1 className="font-medium text-zinc-800 text-2xl">Usuários</h1>
        <UsersTable columns={usersTableColumns} data={data} />
        <h1 className="font-medium text-zinc-800 text-2xl">Registro</h1>
        <HelpBanner />
        <div className="py-8 px-4 rounded-md border border-zinc-200 flex flex-col gap-4">
          <h3 className="font-medium text-sm text-neutral-400 uppercase">Registro</h3>
          <RegisterUserForm />
        </div>
      </div>
    </>
  );
}
