import { getUserListData } from '@/services/get-user-list-data';
import { UsersTable } from './_components/users-table';
import { usersTableColumns } from './_components/users-table-columns';

export default async function UsersPage() {
  const data = await getUserListData();

  return (
    <div className="p-6">
      <div className="max-w-5xl flex flex-col mx-auto">
        <h1 className="font-medium text-zinc-800 text-2xl">Usuários</h1>
        <UsersTable columns={usersTableColumns} data={data} />
      </div>
    </div>
  );
}
