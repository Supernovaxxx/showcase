import { RaindropApiResponse } from '@/types/data/raindrops'
import axios, { AxiosError } from 'axios'


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RAINDROP_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_TOKEN}`,
    }
})

api.interceptors.request.use(null, function (error) {
    // Do something with request error
    if (axios.isAxiosError(error)) {
        console.log(error.message)
    } else {
        error = new AxiosError('An unexpected error occurred')
    }
    return Promise.reject(error as AxiosError)
});


export async function getCollectionRaindropsData(
    collectionID: string,
    search?: string,
    page: number = 0,
    perPage: number = 50,
) {
    const { data } = await api.get<RaindropApiResponse>(
        `raindrops/${collectionID}`,
        {
            params: {
                perPage,
                page,
                search,
            }
        }
    )
    return data
}