import axios, { AxiosError } from "axios"

export const raindropApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RAINDROP_API_BASE_URL,
})

export async function getRaindropsList(page: number, search?:string) {
    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_TOKEN}`,
        }
    }

    const list = await raindropApi.get(`raindrops/${process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID}?&perpage=4&page=${page}&search=${search}`, config)
        .then(response => {
            return response.data
        })
        .catch(function (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.message)
            } else {
                error = new AxiosError('An unexpected error occurred')
            }
            return Promise.reject(error as AxiosError)
        })
    return list
}
