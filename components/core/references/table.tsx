import { getLearnlogData } from "@/lib/sdk/learnlog"
import { DataTable } from "@/components/ui/data-table"

import { columns } from "./columns"


async function getReferences() {
  const data = await getLearnlogData()
  return data
}

export async function ReferencesTable() {
  const refData = await getReferences()

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
        <DataTable columns={columns} data={refData.items} />
      </div>
    </div>
  )
}
