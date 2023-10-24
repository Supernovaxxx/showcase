import { getLearnlogData } from '@/lib/sdk/learnlog'


export async function GET(request: Request) {
    const { search, page } = _getSearchParams(request)

    const { items, ...learnlog_data} = await getLearnlogData(search, page)

    return Response.json({
        references: items,
        ...learnlog_data
    })
}

function _getSearchParams(request: Request) {
    const { searchParams } = new URL(request.url)

    return {
        search: searchParams.get("search") || undefined,
        page: Number(searchParams.get("page"))
    }
}
