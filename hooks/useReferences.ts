'use client'
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
    
    const references = data?.pages.flatMap((page) => page.references) || []

    return { references, ...response }
}
