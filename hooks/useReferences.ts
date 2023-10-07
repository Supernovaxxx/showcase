'use client'
import { useInfiniteQuery } from 'react-query'

import { Reference } from '@/types/core'
import { getCollectionRaindropsData } from '@/lib/sdk/raindrop'

import { usePagination } from './utils'


function useCollectionRaindropsInfiniteQuery(
    collectionID: string,
    search?: string,
    page: number = 0,
    perPage: number = 50,
) {
    return useInfiniteQuery({
        queryKey: [collectionID, search, page, perPage],
        queryFn: () => getCollectionRaindropsData(collectionID, search, page, perPage),
        staleTime: 6000000,
        getNextPageParam: (lastPage, pages) => {
            const maxPageParam = Math.ceil(lastPage.count / perPage)
            if (maxPageParam > pages.length)
                return pages.length;
            return undefined;
        }
    })
}

export function useReferences(search?: string) {
    return usePagination({
        infiniteQuery: () => {
            return useCollectionRaindropsInfiniteQuery(
                process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID!,
                search,
            )
        },
        getItems: (data) => data?.pages.reduce<Reference[]>((acc, page) => [...acc, ...page.items], []) || [],
        getTotal: (data) => data?.pages[0].count || 0,
    })
}