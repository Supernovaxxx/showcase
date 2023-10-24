'use client'

import {
    Table as TanstackTable,
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@/components/ui/table'

import { ChevronLeft, ChevronRight, Loading } from '@/components/site/icons'

import { Button } from './button'
import { CertificateCard } from '../core/certificates'
import { Certificate } from '@/types/core'


interface DataGridProps<TData, TValue> {
    data: TanstackTable<TData>,
}

export function DataGrid<TData, TValue>({
    data: table,
}: DataGridProps<TData, TValue>) {

    const { hasNextPage, isFetching } = table.options.meta!

    return (
        <>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className='h-4 w-5' />
                </Button>
                <div className='flex items-center gap-2'>
                    {table.getState().pagination.pageIndex}
                </div>
                <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage() && (!hasNextPage || isFetching)}
                >
                    {!table.getCanNextPage() && isFetching
                        ? <Loading className='h-5 w-5' />
                        : <ChevronRight className='h-4 w-5' />}
                </Button>
            </div>
            <div className='rounded-md border'>
                <Table>
                    <TableBody className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4
          w-full'>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {/* TODO: make all cells keep same size */}
                                    <TableCell className='p-0' key={row.id}>
                                        <CertificateCard certificate={row.original as Certificate} key={row.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className='h-24 text-center'>
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
