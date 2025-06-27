'use client';

import { ColumnDef } from '@tanstack/react-table';

import { UserListData } from '@/types/user-list-data';
import DeleteUserColumn from './delete-user-column';
import { UsersTableColumnHeader } from './users-table-column-header';

export const usersTableColumns: ColumnDef<UserListData>[] = [
  {
    accessorKey: 'delete',
    header: () => null,
    cell: ({ row }) => <DeleteUserColumn row={row} />,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="User" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Nome" />,
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return name.split('-')[0];
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="E-mail" />,
    cell: ({ row }) => {
      const email: string = row.getValue('email');
      const [local, domain] = email.split('@');
      const prefix = local.split('-')[0];

      return `${prefix}@${domain}`;
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Cidade" />,
  },
  {
    accessorKey: 'weekDays',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Dias da semana" />,
  },
  {
    accessorKey: 'posts',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Posts" />,
  },
  {
    accessorKey: 'albums',
    header: ({ column }) => <UsersTableColumnHeader column={column} title="Álbuns" />,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     if (!row.getIsHovered()) {
  //       return null;
  //     }

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
