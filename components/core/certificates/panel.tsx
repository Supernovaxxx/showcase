'use client'
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
import { CertificateGrid } from '@/components/ui/certificate-grid'
import { Skill } from '@/types/core'

import { columns } from './columns'


export function CertificatesPanel() {

  let certificates = getCertificates()
  const SKILL_LIST = getSkillList()

  function setFilteredSkills(selectedSkills: Skill[]) {
    table.getColumn('skills')?.setFilterValue(selectedSkills)
  }
  const { toggleSkill, skillIsActive } = useSkills(setFilteredSkills)

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
    meta: {
      hasNextPage: undefined,
      isFetching: undefined
    },
  })

  return (
    <>
      <div className='flex flex-col justify-center items-center gap-1 m-1 sm:m-8 sm:w-3/4'>
        <h2 className='text-xl font-bold text-foreground'>
          Filter by skills
        </h2>
        <div className='flex flex-wrap justify-start w-full overflow-x-hidden'>
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
