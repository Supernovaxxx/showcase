'use client'

import { Dispatch, SetStateAction } from 'react'
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ReferenceListApiResponse } from '@/types/api'

import { Button } from './button'


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: TData[],
  hasNextPage: boolean | undefined,
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<ReferenceListApiResponse, unknown>>,
  page: number,
  setPage: Dispatch<SetStateAction<number>>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hasNextPage,
  fetchNextPage,
  page,
  setPage
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: 10
      }
    },
    onPaginationChange: (updater) => {
      const updated_state =
        typeof updater === 'function'
          ? updater(table.getState().pagination)
          : updater

      if (updated_state.pageIndex !== pageIndex) {
        const pageCount = table.getPageCount();
        if (updated_state.pageIndex === pageCount - 2 && hasNextPage) {
          fetchNextPage()
        }
      }
    }
  })

  const pageIndex = table.getState().pagination.pageIndex

  function handleNextPage() {
    table.nextPage()
    setPage(pageIndex + 1)
  }

  function handlePreviousPage() {
    table.previousPage()
    setPage(pageIndex - 1)
  }

  return (
    <>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => handlePreviousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className='flex items-center gap-2'>
          {table.getState().pagination.pageIndex}
        </div>
        <Button
          variant='outline'
          size='sm'
          onClick={() => handleNextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
