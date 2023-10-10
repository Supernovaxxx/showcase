'use client'
import { useInfiniteQuery } from 'react-query'

import { LocalApi } from '@/lib/sdk/local'
import { Reference } from '@/types/core'

import { usePagination } from './utils'


function useReferencesInfiniteQuery(
    search?: string,
    page: number = 0,
) {
    const api = new LocalApi()

    return useInfiniteQuery({
        queryKey: [search, page],
        queryFn: () => api.getReferencesData(search, page),
        staleTime: 6000000,
        getNextPageParam: (lastPage) => lastPage.next_page_index
    })
}

export function useReferences(search?: string) {
    return usePagination({
        infiniteQuery: () => {
            return useReferencesInfiniteQuery(search)
        },
        getItems: (data) => data?.pages.reduce<Reference[]>((acc, page) => [...acc, ...page.references], []) || [],
        getTotal: (data) => data?.pages[0].total_items || 0,
    })
}