'use client'
import { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

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

    const connection = useCollectionRaindropsInfiniteQuery(
        process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID!,
        search,
    )

    const references =
        connection.data?.pages
            .reduce<Raindrop[]>((acc, page) => [...acc, ...page.items], [])

    const total = connection.data?.pages[0].count || 0

    return {
        references,
        total,
        ...connection,
    }
}

export function usePaginetedReferences(
    _index: number = 0,
    search?: string,
) {
    const { references, total, data, isLoading, fetchNextPage, ...response } = useReferences(search)

    const [index, setIndex] = useState<number>(_index)
    const [perPage, setPerPage] = useState<number>(0)
    const firstIndexNextPage = index + perPage

    const page = Math.floor(index / perPage) + 1
    const lastPage = Math.ceil(total / perPage)
    const firstIndexLastPage = (lastPage - 1) * perPage

    const isFirstPage = page === 1
    const isLastPage = firstIndexNextPage >= total

    useEffect(() => {
        if (
            !isLoading
            && references && references.length <= firstIndexNextPage
            && !isLastPage
        ) {
            fetchNextPage()
        }
    }, [index, perPage, references])


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
        pageData: references?.slice(index, firstIndexNextPage),

        index,
        setIndex,
        firstIndexNextPage,
        firstIndexLastPage,

        perPage,
        setPerPage,

        page,
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
