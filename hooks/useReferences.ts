'use client'
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

import { LocalApi } from '@/lib/sdk/local'


export function useReferencesInfiniteQuery(
    search?: string,
) {
    const api = new LocalApi()

    return useInfiniteQuery({
        queryKey: [search],
        queryFn: ({pageParam}) => api.getReferencesData(search, pageParam),
        staleTime: 6000000,
        getNextPageParam: (lastPage) => lastPage.next_page_index,
        keepPreviousData: true
    })
}

export function useReferences(search?: string) {
    const { data, ...response } = useReferencesInfiniteQuery(search)
    
    const [references, setReferences] = useState(flatReferences)

    function flatReferences() {
        return data?.pages.flatMap((page) => page.references) || []
    }

    useEffect(() => {
        setReferences(flatReferences)
    },[data])

    return { references, ...response }
}
