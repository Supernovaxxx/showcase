import { useEffect, useState } from "react"
import { InfiniteData, UseInfiniteQueryResult } from "react-query"


interface usePaginationParams<TData, TItem> {
    infiniteQuery: () => UseInfiniteQueryResult<TData>,
    getItems: (data?: InfiniteData<TData>) => TItem[],
    getTotal: (data?: InfiniteData<TData>) => number,
}

export function usePagination<TData, TItem>({ infiniteQuery, getItems, getTotal }: usePaginationParams<TData, TItem>) {
    const { data, isLoading, isFetching, isError, fetchNextPage, ...response } = infiniteQuery()

    const items = getItems(data)
    const total = getTotal(data)

    const [index, setIndex] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(0)
    const firstIndexNextPage = index + perPage

    const page = Math.floor(index / perPage)
    const lastPage = Math.ceil(total / perPage)
    const firstIndexLastPage = (lastPage - 1) * perPage

    const isFirstPage = page === 0
    const isLastPage = firstIndexNextPage >= total

    useEffect(() => {
        if (
            !isLoading
            && items && items.length <= firstIndexNextPage
            && !isLastPage
        ) {
            fetchNextPage()
        }
    }, [index, perPage, items])


    function movePage(step: number) {
        if (step) {
            setIndex(
                Math.min(
                    Math.max(
                        index + step * perPage,
                        0
                    ),
                    firstIndexLastPage
                )
            )
        }
    }

    return {
        pageData: items?.slice(index, firstIndexNextPage),

        index,
        setIndex,
        firstIndexNextPage,
        firstIndexLastPage,

        perPage,
        setPerPage,

        page: page || 0,
        lastPage,
        isFirstPage,
        isLastPage,

        movePage,
        moveToFirstPage: () => setIndex(0),
        moveToNextPage: () => movePage(1),
        moveToPreviousPage: () => movePage(-1),
        moveToLastPage: () => setIndex(firstIndexLastPage),

        isLoading,
        isFetching,
        isError,
    }
}