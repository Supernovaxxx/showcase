'use client'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { axios, AxiosError, raindropApi } from '@/lib/sdk'
import { RaindropApiResponse } from '@/types/data/raindrops'


export function useRaindrops(
    itemsPerPage: number,
    search?: string,
    collectionID: string = `${process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID}`,
) {

    const [page, setPage] = useState<number>(0)
    const { data, ...response } = getRaindropsCollectionData()
    const isFirstPage = page === 0
    const isLastPage = checkIfLastPage()

    function getRaindropsCollectionData() {
        async function getList() {
            const { data } = await raindropApi<RaindropApiResponse>(
                `raindrops/${collectionID}?&perpage=${itemsPerPage}&page=${page}&search=${search}`,
            ).catch(function (error) {
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
            queryKey: [page, itemsPerPage, search, collectionID],
            queryFn: () => getList(),
            staleTime: 6000000,
        })
    }

    function checkIfLastPage() {
        const count = data?.count
        const totalOfPages = Math.ceil(count! / itemsPerPage)
        return page + 1 === totalOfPages
    }

    function changePage(direction: string) {
        if (direction === 'previous' && !isFirstPage) setPage((prevPage: number) => prevPage - 1)
        if (direction === 'next' && !isLastPage) setPage((prevPage: number) => prevPage + 1)
    }

    return { data, isFirstPage, isLastPage, changePage, setPage, ...response }
}
