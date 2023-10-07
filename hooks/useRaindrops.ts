'use client'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { axios, AxiosError, raindropApi } from '@/lib/sdk'
import { Raindrop, RaindropApiResponse } from '@/types/data/raindrops'

function getCollectionRaindropsData(
    collectionID: string,
    search?: string,
    page: number = 0,
    itemsPerPage: number = 50,
) {
    async function getList() {
        const { data } = await raindropApi<RaindropApiResponse>(
            `raindrops/${collectionID}?` +
            `&perpage=${itemsPerPage}` +
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
    return useQuery<RaindropApiResponse, AxiosError>({
        queryKey: [page, itemsPerPage, collectionID, search],
        queryFn: () => getList(),
        staleTime: 6000000,
    })
}

export function useReferences(search?: string) {

    const [page, setPage] = useState<number>(0)
    const [total, setTotal] = useState<number>(0)
    const [searchString, setSearchString] = useState<string>('')

    const { data, isLoading, ...response } = getCollectionRaindropsData(
        process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID!,
        searchString,
        page,
    )

    const [references, setReferences] = useState<Raindrop[]>(
        data !== undefined ? data.items : []
    )
    useEffect(() => {
        setTotal(data?.count || 0)

        if (data?.items) {
            setReferences((prevReferences: Raindrop[]) => [
                ...prevReferences,
                ...data.items,
            ])
        }
    }, [data])

    useEffect(() => {
        setSearchString(search || '')
        setPage(0)
    }, [search])

    function loadMoreReferences() {
        setPage((prevPage: number) => prevPage + 1)
    }

    return { references, isLoading, total, loadMoreReferences, ...response }
}


export function usePaginetedReferences(
    _index: number = 0,
    search?: string,
) {
    const { references, isLoading, total, loadMoreReferences, ...response } = useReferences(search)

    const [index, setIndex] = useState<number>(_index)
    const [perPage, setPerPage] = useState<number>(0)
    const firstIndexNextPage = index + perPage
    const [pageData, setPageData] = useState<Raindrop[]>(references.slice(index, firstIndexNextPage))


    const page = Math.floor(index / perPage) + 1
    const isFirstPage = page === 1
    const isLastPage = firstIndexNextPage >= total

    useEffect(() => {
        if (
            !isLoading
            && references?.length <= firstIndexNextPage
            && !isLastPage
        ) {
            loadMoreReferences()
        }

        setPageData(references?.slice(index, firstIndexNextPage))
    }, [index, perPage, references])


    function nextPage() {
        if (!isLastPage)
            setIndex((prevIndex: number) => prevIndex + perPage)
    }

    function previousPage() {
        if (!isFirstPage)
            setIndex((prevIndex: number) => prevIndex - perPage)
    }

    function changePage(direction: string) {
        if (direction === 'previous') previousPage()
        if (direction === 'next') nextPage()
    }

    return {
        pageData,
        index,
        setIndex,
        firstIndexNextPage,
        perPage,
        setPerPage,
        page,
        isFirstPage,
        isLastPage,
        changePage,
        nextPage,
        previousPage,
        isLoading,
        ...response
    }
}
