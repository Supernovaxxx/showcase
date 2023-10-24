'use client'

import { ColumnDef } from "@tanstack/react-table"

import { Reference } from "@/types/core"
import { convertDateFromIsoToDayMonthYear } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ExternalDomainFavicon } from "@/components/site/icons"


export const columns: ColumnDef<Reference>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title: string = row.getValue("title")
      const link = row.original.link
      return <a href={link} target="_blank">{title}</a>
    }
  },
  {
    accessorKey: "created",
    header: "Pinned on",
    cell: ({ row }) => {
      const date: string = row.getValue("created")
      return <div className="font-medium">{convertDateFromIsoToDayMonthYear(date)}</div>
    }
  },
  {
    accessorKey: "domain",
    header: "Website",
    cell: ({ row }) => {
      const domain: string = row.getValue("domain")
      return (
        <div className='text-sm [font-variant-caps:small-caps]'>
          {domain} {' '}
          <ExternalDomainFavicon domain={domain} />
        </div>
      )
    }
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags")
      return <div className='flex gap-1'>{tags.map((item, index) => <Badge key={index}>{item}</Badge>)}</div>
    }
  },
]
