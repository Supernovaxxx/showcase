import { RaindropsApi } from '@/lib/sdk/raindrop'


const PER_PAGE = 50

export async function GET(request: Request) {
    const { search, page } = _getSearchParams(request)

    const learnlog_data = await _getLearnlogData(search, page)

    const total_items = learnlog_data.count
    const total_pages = Math.ceil(total_items / PER_PAGE)

    const response = {

        page_index: page,
        items_per_page: PER_PAGE,
        next_page_index: total_pages > page ? page + 1 : undefined,

        total_items,
        total_pages,
    }

    console.log(response)

    return Response.json({
        references: learnlog_data.items,
        ...response
    })
}

function _getSearchParams(request: Request) {
    const { searchParams } = new URL(request.url)

    return {
        search: searchParams.get("search") || undefined,
        page: Number(searchParams.get("page"))
    }
}

async function _getLearnlogData(search?: string, page: number = 0) {
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

    return data
}