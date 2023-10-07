'use client'
import { useEffect, useState } from 'react'
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from 'react-query'

import { axios, AxiosError, raindropApi } from '@/lib/sdk'
import { Raindrop, RaindropApiResponse } from '@/types/data/raindrops'


async function _getCollectionRaindropsData(
    collectionID: string,
    search?: string,
    page: number = 0,
    perPage: number = 50
) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const { data } = await raindropApi<RaindropApiResponse>(
        `raindrops/${collectionID}` +
        `?perpage=${perPage}` +
        `&page=${page}` +
        `&search=${search}`
    ).catch(function (error: any) {
        if (axios.isAxiosError(error)) {
            console.log(error.message)
        } else {
            error = new AxiosError('An unexpected error occurred')
        }
        return Promise.reject(error as AxiosError)
    })
    return data
}

function useCollectionRaindropsInfiniteQuery(
    collectionID: string,
    search?: string,
    page: number = 0,
    perPage: number = 50,
) {

    return useInfiniteQuery<RaindropApiResponse, AxiosError>({
        queryKey: [collectionID, search, page, perPage],
        queryFn: () => _getCollectionRaindropsData(collectionID, search, page, perPage),
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
    return usePagination<RaindropApiResponse, Raindrop>({
        infiniteQuery: () => {
            return useCollectionRaindropsInfiniteQuery(
                process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID!,
                search,
            )
        },
        getItems: (data) => data?.pages.reduce<Raindrop[]>((acc, page) => [...acc, ...page.items], []) || [],
        getTotal: (data) => data?.pages[0].count || 0,
    })
}

interface usePaginationParams<TData, TItem> {
    infiniteQuery: () => UseInfiniteQueryResult<TData>,
    getItems: (data?: InfiniteData<TData>) => TItem[],
    getTotal: (data?: InfiniteData<TData>) => number,
}

export function usePagination<TData, TItem>({ infiniteQuery, getItems, getTotal }: usePaginationParams<TData, TItem>) {
    const { data, isLoading, fetchNextPage, ...response } = infiniteQuery()

    const items = getItems(data)
    const total = getTotal(data)

    const [index, setIndex] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(0)
    const firstIndexNextPage = index + perPage

    const page = Math.floor(index / perPage)
    const lastPage = Math.ceil(total / perPage)
    const firstIndexLastPage = (lastPage - 1) * perPage

    const isFirstPage = page === 0
    const isLastPage = firstIndexNextPage >= total

    useEffect(() => {
        if (
            !isLoading
            && items && items.length <= firstIndexNextPage
            && !isLastPage
        ) {
            fetchNextPage()
        }
    }, [index, perPage, items])


    function movePage(step: number) {
        if (step) {
            setIndex(
                Math.min(
                    Math.max(
                        index + step * perPage,
                        0
                    ),
                    firstIndexLastPage
                )
            )
        }
    }

    return {
        pageData: items?.slice(index, firstIndexNextPage),

        index,
        setIndex,
        firstIndexNextPage,
        firstIndexLastPage,

        perPage,
        setPerPage,

        page: page || 0,
        lastPage,
        isFirstPage,
        isLastPage,

        movePage,
        moveToFirstPage: () => setIndex(0),
        moveToNextPage: () => movePage(1),
        moveToPreviousPage: () => movePage(-1),
        moveToLastPage: () => setIndex(firstIndexLastPage),

        isLoading,
        ...response
    }
}
