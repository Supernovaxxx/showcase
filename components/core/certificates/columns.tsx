'use client'
import { ColumnDef } from '@tanstack/react-table'

import { Certificate } from '@/types/core'


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
        accessorKey: 'tags',
        header: 'Tags',
    },
]
