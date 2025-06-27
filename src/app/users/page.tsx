import { getUserListData } from '@/services/get-user-list-data';
import { UsersTable } from './_components/users-table';
import { usersTableColumns } from './_components/users-table-columns';

export default async function UsersPage() {
  const data = await getUserListData();

  return (
    <div className="p-6">
      <div className="max-w-5xl flex items-center justify-between mx-auto">
        <UsersTable columns={usersTableColumns} data={data} />
      </div>
    </div>
  );
}
