import { RaindropsApi } from "./raindrop"


const PER_PAGE = 50

export async function getLearnlogData(search?: string, page: number = 0) {
    const api = new RaindropsApi(
        process.env.RAINDROP_API_BASE_URL!,
        process.env.RAINDROP_TOKEN!
    )

    let data = await api.getCollectionRaindropsData(
        process.env.LEARNLOG_COLLECTION_ID!,
        search,
        page,
        PER_PAGE,
    )

    const total_items = data.count
    const total_pages = Math.ceil(total_items / PER_PAGE)

    const response = {

        items: data.items,
        page_index: page,
        items_per_page: PER_PAGE,
        next_page_index: total_pages > page ? page + 1 : undefined,

        total_items,
        total_pages,
    }
    
    return response
}
