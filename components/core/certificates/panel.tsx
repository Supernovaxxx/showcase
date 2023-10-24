'use client'
import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"

import { DataGrid } from '@/components/ui/data-grid'
import { Certificate } from '@/types/core'

import { columns } from "./columns"

import { getCertificates, getSkillList } from '@/lib/data'
import { useSkills } from '@/hooks/useSkills'
import { SkillBadgesList } from '@/components/core/skills'
import { CertificateGrid } from '@/components/ui/certificate-grid'
import { Skill } from '@/types/core'

interface CertificatesPanelProps {
  certificates: Certificate[]
}

export function CertificatesPanel({ certificates }: CertificatesPanelProps) {
  
  const [page, setPage] = useState<number>(0)

  //TODO: handle hasNextPage and isFetching if not sending in 'meta'
  const hasNextPage = false
  const isFetching = false
  
  const data = useReactTable({
    data: certificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    state: {
      pagination: {
        pageIndex: page,
        pageSize: 9
      }
    },
    onPaginationChange: (updater) => {
      const updated_state =
        typeof updater === 'function'
          ? updater(data.getState().pagination)
          : updater

      setPage(updated_state.pageIndex)
    },
    meta: { hasNextPage, isFetching }
  })

  function setFilteredSkills(selectedSkills: Skill[]) {
    table.getColumn('skills')?.setFilterValue(selectedSkills)
  }
  const {
    selectedSkills,
    toggleSkill,
    skillIsActive
  } = useSkills()

  useEffect(() => {
    setFilteredSkills(selectedSkills)
  }, [selectedSkills])

  return (
    <section
      className='
        flex flex-col justify-center items-center gap-y-2 sm:gap-4
        my-4 mx-2 sm:mx-8
        w-11/12 sm:w-4/5
        text-slate-800
      '
    >
      <DataGrid data={data} />
    </section>
  )
}
