'use client'
import { useQuery, UseQueryResult } from 'react-query'

import { axios, AxiosError, raindropApi } from '@/lib/sdk'
import { RaindropApiResponse } from '@/types/data/raindrops'


export function useRaindrops(
    page: number,
    itemsPerPage: number,
    search?: string,
    collectionID: string = `${process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID}`,
): UseQueryResult<RaindropApiResponse, AxiosError<unknown, any>> {

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
