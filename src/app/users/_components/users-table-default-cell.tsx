import { ReactNode } from 'react';

interface UsersTableDefaultCellProps {
  children: ReactNode;
}

export default function UsersTableDefaultCell({ children }: UsersTableDefaultCellProps) {
  return <span className="text-neutral-500 font-normal text-sm">{children}</span>;
}
