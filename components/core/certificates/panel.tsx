'use client'
import { useEffect, useState } from 'react'
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import { getCertificates, getSkillList } from '@/lib/data'
import { useSkills } from '@/hooks/useSkills'
import { SkillBadgesList } from '@/components/core/skills'
import { Certificate } from '@/types/core'

import { columns } from './columns'
import { CertificateGrid } from './grid'


export function CertificatesPanel() {

  let certificates = getCertificates()
  const SKILL_LIST = getSkillList()
  const { selectedSkills, toggleSkill, skillIsActive } = useSkills()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: certificates,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 9
      },
    },
    state: {
      columnFilters: columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    meta: {
      hasNextPage: undefined,
      isFetching: undefined
    },
  })
  useEffect(() => {
    table.getColumn('skills')?.setFilterValue(selectedSkills)
  }, [selectedSkills])

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-1 m-1 sm:m-8 sm:w-3/4'>
        <h2 className='text-xl font-bold text-foreground'>
          Filter by skills
        </h2>
        <div className='flex flex-wrap justify-start gap-2 sm:gap-2 m-2'>
          <SkillBadgesList skills={SKILL_LIST} toggleSkill={toggleSkill} skillIsActive={skillIsActive} />
        </div>
      </div>
      <div className='
        flex flex-col justify-center items-center gap-y-2 sm:gap-4
        my-4 mx-2 sm:mx-8
        w-11/12 sm:w-4/5
        text-foreground
      '>
        <CertificateGrid table={table} />
      </div>
    </>
  )
}
