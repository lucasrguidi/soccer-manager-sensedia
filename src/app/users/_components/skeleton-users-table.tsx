import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface SkeletonUsersTableProps {
  rows?: number;
  columnsCount: number;
}

export default function SkeletonUsersTable({ rows = 5, columnsCount }: SkeletonUsersTableProps) {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="flex items-center py-4">
        <div className="h-10 bg-zinc-200 rounded w-full" />
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              {Array.from({ length: columnsCount }).map((_, idx) => (
                <TableHead key={idx}>
                  <div className="h-4 bg-zinc-200 rounded w-2/3" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <TableRow key={rowIdx}>
                {Array.from({ length: columnsCount }).map((_, colIdx) => (
                  <TableCell key={colIdx}>
                    <div className="h-4 bg-zinc-200 rounded w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="h-4 bg-zinc-200 rounded w-16" />
        <div className="h-4 bg-zinc-200 rounded w-24" />
        <div className="h-4 bg-zinc-200 rounded w-20" />
      </div>
    </div>
  );
}
