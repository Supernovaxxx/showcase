export interface Raindrop {
    title: string
    link: string
    created: string
    tags: string[]
    type: string
    cover: string
    domain: string
}

export interface RaindropApiResponse {
    result: boolean
    items: Raindrop[]
    count: number
    collectionId: number
}
