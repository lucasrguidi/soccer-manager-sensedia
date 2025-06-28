'use client';

import { deleteUserAction } from '@/app/actions/delete-user-action';
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog';
import { Button } from '@/components/ui/button';
import { UserListData } from '@/types/user-list-data';
import { Row } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { useTransition } from 'react';

interface DeleteUserColumnProps {
  row: Row<UserListData>;
}

export default function DeleteUserColumn({ row }: DeleteUserColumnProps) {
  const [isPending, startTransition] = useTransition();

  const trigger = (
    <Button
      variant={'ghost'}
      size={'icon'}
      className="invisible group-hover:visible transition-none"
    >
      <Trash />
    </Button>
  );

  async function handleConfirm() {
    startTransition(async () => {
      try {
        await deleteUserAction(row.original.id);
      } catch (err: unknown) {
        console.error('Erro ao excluir usuário:', err);
      }
    });
  }

  return (
    <ConfirmDeleteDialog
      trigger={trigger}
      onConfirm={handleConfirm}
      loading={isPending}
      title="Deseja mesmo excluir?"
      description="Essa ação é irreversível e vai remover todos os dados do usuário."
    />
  );
}
