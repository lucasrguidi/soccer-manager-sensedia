'use client';

import { ColumnDef } from '@tanstack/react-table';

import { UserListData } from '@/types/user-list-data';
import DeleteUserColumn from './delete-user-column';
import { UsersTableColumnHeader } from './users-table-column-header';
import UsersTableDefaultCell from './users-table-default-cell';

export const usersTableColumns: ColumnDef<UserListData>[] = [
  {
    accessorKey: 'delete',
    header: () => null,
    cell: ({ row }) => <DeleteUserColumn row={row} />,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="User" />,
    cell: ({ row }) => (
      <span className="text-neutral-700 font-medium text-sm">{row.original.username}</span>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <UsersTableDefaultCell>{name.split('-')[0]}</UsersTableDefaultCell>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="E-mail" />,
    cell: ({ row }) => {
      const email: string = row.getValue('email');
      const [local, domain] = email.split('@');
      const prefix = local.split('-')[0];
      const displayEmail = `${prefix}@${domain}`;

      return <UsersTableDefaultCell>{displayEmail}</UsersTableDefaultCell>;
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Cidade" />,
    cell: ({ row }) => <UsersTableDefaultCell>{row.original.city}</UsersTableDefaultCell>,
  },
  {
    accessorKey: 'weekDays',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Dias da semana" />,
    cell: ({ row }) => <UsersTableDefaultCell>{row.original.weekDays}</UsersTableDefaultCell>,
  },
  {
    accessorKey: 'posts',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Posts" />,
    cell: ({ row }) => <UsersTableDefaultCell>{row.original.posts}</UsersTableDefaultCell>,
  },
  {
    accessorKey: 'albums',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Álbuns" />,
    cell: ({ row }) => <UsersTableDefaultCell>{row.original.albums}</UsersTableDefaultCell>,
  },
];
