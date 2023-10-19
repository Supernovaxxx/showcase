'use client'
import { useState } from "react"

import { DataTable } from "@/components/ui/data-table"
import { useReferences } from "@/hooks/useReferences"

import { columns } from "./columns"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"


export function ReferencesTable() {

  const { references, ...response } = useReferences()
  const { isError, hasNextPage, fetchNextPage, isFetching } = response
  const [page, setPage] = useState<number>(0)

  const table = useReactTable({
    data: references,
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
      setPage(updated_state.pageIndex)
    }
  })

  const pageIndex = table.getState().pagination.pageIndex

  return (
    <div className='flex flex-col justify-center items-center gap-2
          p-8 w-100
    '>
      <h2 className='text-3xl font-bold text-slate-800'>
        Learnlog table
      </h2>
      <div className='w-4/5'>
        {
          isError
            ? <p className='w-full text-lg col-span-full text-center pt-8'>An error occured. Please try again.</p>
            : references?.length
              ? <DataTable columns={columns} table={table} hasNextPage={hasNextPage} isFetching={isFetching} />
              : (
                <p className='w-full text-lg col-span-full text-center pt-8'>
                  Loading...
                </p>
              )
        }
      </div>
    </div>
  )
}
