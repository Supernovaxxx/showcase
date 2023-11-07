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

        const pageCount = table.getPageCount()
        if (updated_state.pageIndex === pageCount - 2 && hasNextPage) {
          fetchNextPage()
        }
      setPage(updated_state.pageIndex)
    },
    meta: { hasNextPage, isFetching }
  })

  return (
    <div className='flex flex-col justify-center items-center gap-2
          p-8 w-100
    '>
      <h2 className='text-3xl font-bold text-foreground'>
        Learnlog table
      </h2>
      <div className='w-4/5'>
        {
          isError
            ? <p className='w-full text-lg col-span-full text-center pt-8'>An error occured. Please try again.</p>
            : references?.length
              ? <DataTable table={table} />
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
