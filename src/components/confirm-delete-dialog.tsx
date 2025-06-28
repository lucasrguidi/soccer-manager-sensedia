'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import LoadingSpinner from './loading-spinner';

interface ConfirmDeleteDialogProps {
  trigger: React.ReactNode;
  onConfirm: () => Promise<void>;
  loading: boolean;
  title?: string;
  description?: string;
}

export default function ConfirmDeleteDialog({
  trigger,
  onConfirm,
  loading,
  title = 'Tem certeza?',
  description = 'Essa ação não pode ser desfeita.',
}: ConfirmDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            className="w-fit uppercase text-secondary-purple hover:text-secondary-purple/90"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={loading} className="uppercase">
            {loading && <LoadingSpinner />}
            {loading ? 'Deletando...' : 'Excluir'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
