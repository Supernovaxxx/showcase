'use client'
import { Raindrops } from "@/components/core/references/panel"
import { getRaindropsList } from "@/lib/sdk"
import { useEffect, useState } from "react"

export function useRaindrops(page:number, search?:string) {
    const [references, setReferences] = useState<Raindrops>()

    useEffect(() => {
        async function fetchData() {
            const references: Raindrops = await getRaindropsList(page, search)
            setReferences(references)
        }
        fetchData()
    }, [page, search])

    return references
}
