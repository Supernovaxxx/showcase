import axios, { AxiosError } from "axios"

export const raindropApi = axios.create({
    baseURL: process.env.RAINDROP_API_BASE_URL,
})

export async function getRaindropsList() {
    const config = {
        headers: {
            'Authorization': `Bearer ${process.env.RAINDROP_TOKEN}`,
        }
    }

    const list = await raindropApi.get(`raindrops/${process.env.RAINDROP_COLLECTION_ID}/`, config)
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
