import { Reference } from "./core"


export interface ReferenceListApiResponse {
    references: Reference[]

    page_index: number
    items_per_page: number
    next_page_index?: number

    total_items: number
    total_pages: number
}