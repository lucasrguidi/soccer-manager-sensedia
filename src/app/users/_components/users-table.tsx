'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/ui/search-input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UsersTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [globalFilter, setGlobalFilter] = useState<string>('');

  const router = useRouter();

  const usernameOrNameFilter: FilterFn<TData> = (row, _columnId, filterValue) => {
    const u = String(row.getValue('username')).toLowerCase();
    const n = String(row.getValue('name')).toLowerCase();
    return (
      u.includes(String(filterValue).toLowerCase()) || n.includes(String(filterValue).toLowerCase())
    );
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: usernameOrNameFilter,
    state: {
      sorting,
      columnFilters,
      pagination,
      globalFilter,
    },
  });

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  function getPageItems() {
    const siblings = 1;
    const items: (number | '...')[] = [];
    for (let i = 0; i < pageCount; i++) {
      if (
        i === 0 ||
        i === pageCount - 1 ||
        (i >= pageIndex - siblings && i <= pageIndex + siblings)
      ) {
        items.push(i);
      } else if (items[items.length - 1] !== '...') {
        items.push('...');
      }
    }
    return items;
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <SearchInput
          label="Procurar"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="group"
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => router.push(`/users/${(row.original as { id: string }).id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <span className="uppercase text-sm font-medium text-neutral-500">
            Total {table.getRowCount()}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-full"
          >
            Anterior
          </Button>

          {getPageItems().map((item, idx) =>
            item === '...' ? (
              <span key={idx} className="px-2 select-none">
                …
              </span>
            ) : (
              <Button
                key={item}
                size="sm"
                variant={item === pageIndex ? 'ghost' : 'outline'}
                onClick={() => table.setPageIndex(item)}
                className="rounded-full"
              >
                {item + 1}
              </Button>
            ),
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-full"
          >
            Próximo
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="uppercase text-sm font-medium text-neutral-500">Ir para a página</span>
          <Select
            value={String(pageIndex)}
            onValueChange={(value) => table.setPageIndex(Number(value))}
          >
            <SelectTrigger className="bg-white ">
              <SelectValue placeholder={String(pageIndex + 1)} />
            </SelectTrigger>
            <SelectContent className="min-w-40 rounded-none bg-neutral-700 border-neutral-700 text-zinc-200">
              {table.getPageOptions().map((p) => (
                <SelectItem
                  key={p}
                  value={String(p)}
                  className="focus:bg-neutral-700 focus:text-zinc-200 rounded-none border-l-4 border-neutral-700 focus:border-primary-purple"
                >
                  {p + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
