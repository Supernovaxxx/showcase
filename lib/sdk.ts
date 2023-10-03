import axios from "axios"

export const raindropApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RAINDROP_API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_RAINDROP_TOKEN}`,
    }
})
