'use client'
import { Raindrops } from "@/components/core/references/panel"
import { raindropApi } from "@/lib/sdk"
import axios, { AxiosError } from "axios"
import { useQuery } from "react-query"

export function useRaindrops(page: number, search?:string) {

    async function getList() {
        const { data } = await raindropApi<Raindrops>(
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

    return useQuery<Raindrops, AxiosError>({
        queryKey:[page, search],
        queryFn: () => getList(),
        staleTime: 6000000,
    })
}
