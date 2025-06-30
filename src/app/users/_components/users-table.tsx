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

import { SearchInput } from '@/components/ui/search-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Paginator from './paginator';

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
                  className="group cursor-pointer"
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

        <div className="flex justify-end">
          <Paginator
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(pageNumber) => table.setPageIndex(pageNumber - 1)}
            showPreviousNext
          />
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
