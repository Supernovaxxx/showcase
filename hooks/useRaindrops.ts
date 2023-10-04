'use client'
import { useQuery } from 'react-query'

import { axios, AxiosError, raindropApi } from '@/lib/sdk'
import { RaindropApiResponse } from '@/types/data/raindrops'


export function useRaindrops(page: number, search?:string) {

    async function getList() {
        const { data } = await raindropApi<RaindropApiResponse>(
            `raindrops/${process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID}?&perpage=4&page=${page}&search=${search}`,
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
        queryKey:[page, search],
        queryFn: () => getList(),
        staleTime: 6000000,
    })
}
