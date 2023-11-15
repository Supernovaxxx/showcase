'use client'

import {
    Table as TanstackTable,
} from '@tanstack/react-table'

import { Certificate } from '@/types/core'
import { ChevronLeft, ChevronRight, Loading } from '@/components/site/icons'
import { CertificateCard } from '@/components/core/certificates'

import { Button } from '@/components/ui/button'


interface CertificateGridProps<TData, TValue> {
    table: TanstackTable<TData>,
}

export function CertificateGrid<TData, TValue>({
    table,
}: CertificateGridProps<TData, TValue>) {

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
            <div className='
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4
                w-full
            '>
                {
                    table.getRowModel().rows?.length
                        ? (table.getRowModel().rows.map((row) => (
                            <CertificateCard certificate={row.original as Certificate} key={row.id} />
                        )))
                        : <div className='h-24 text-center'>
                            No results.
                        </div>
                }
            </div>
        </>
    )
}
