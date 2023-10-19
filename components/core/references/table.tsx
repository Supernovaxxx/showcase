'use client'
import { useState } from "react"

import { DataTable } from "@/components/ui/data-table"
import { useReferences } from "@/hooks/useReferences"

import { columns } from "./columns"


export function ReferencesTable() {

  const { references, isError, hasNextPage, fetchNextPage, ...response } = useReferences()
  const [page, setPage] = useState<number>(0)

  return (
    <div
      className='
          flex flex-col justify-center items-center gap-2
          p-8
          w-100
        '
    >
      <h2
        className='
            text-3xl font-bold text-slate-800
          '
      >
        Learnlog table
      </h2>
      <div className='w-4/5'>
        {
          isError
            ? <p className='w-full text-lg col-span-full text-center pt-8'>An error occured. Please try again.</p>
            :
            references?.length
              ? <DataTable columns={columns} data={references} hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} page={page} setPage={setPage} />
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
