'use client'
import { ColumnDef } from '@tanstack/react-table'

import { Certificate, Skill } from '@/types/core'


export const columns: ColumnDef<Certificate>[] = [
    {
        accessorKey: 'date',
        header: 'Date',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'issuer',
        header: 'Issuer',
    },
    {
        accessorKey: 'skills',
        header: 'Skills',
        cell: ({ row }) => {
            const skills: string[] = row.getValue('skills')
            return <div className='flex gap-1'>{skills.map((item, index) => <span key={index}>{item} </span>)}</div>
        },
        filterFn: (row, columnIds, selectedSkills) => {
            return selectedSkills.length === 0
                ? true
                : row.original.skills.some(
                    (skill: Skill) => selectedSkills.includes(skill)
                )
        },
    }
]
