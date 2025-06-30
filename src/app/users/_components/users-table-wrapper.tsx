import { getUserListData } from '@/services/get-user-list-data';
import { UsersTable } from './users-table';
import { usersTableColumns } from './users-table-columns';

export default async function UsersTableWrapper() {
  const data = await getUserListData();

  return <UsersTable columns={usersTableColumns} data={data} />;
}
