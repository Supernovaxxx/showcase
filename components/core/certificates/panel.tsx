'use client'
import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import { CertificateGrid } from '@/components/ui/certificate-grid'
import { Certificate } from '@/types/core'

import { columns } from "./columns"


interface CertificatesPanelProps {
  certificates: Certificate[]
}

export function CertificatesPanel({ certificates }: CertificatesPanelProps) {

  const table = useReactTable({
    data: certificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    initialState: {
      pagination: {
        pageSize: 9
      }
    },
    meta: { 
      hasNextPage: undefined,
      isFetching: undefined 
    }
  })
  
  return (
    <section
      className='
        flex flex-col justify-center items-center gap-y-2 sm:gap-4
        my-4 mx-2 sm:mx-8
        w-11/12 sm:w-4/5
        text-slate-800
      '
    >
      <CertificateGrid table={table} />
    </section>
  )
}
