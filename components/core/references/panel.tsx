'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LucideIcons } from '@/components/site/icons'
import { useRaindrops } from '@/hooks/useRaindrops'

import { ReferenceCard } from '@/components/core/references'
import { ReferencesSkeleton } from '@/components/core/references/skeleton'


export function ReferencesPanel() {
    const { ChevronLeft, ChevronRight } = LucideIcons

    var [page, setPage] = useState<number>(0)
    var [search, setSearch] = useState<string>('')
    const [itemsPerPage, setItemsPerPage] = useState(4)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 1024) {
                setItemsPerPage(6)
            } else {
                setItemsPerPage(4)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()
    }, [])

    const { data, isLoading, isError } = useRaindrops(page, itemsPerPage, search)
    const references = data

    const nextPageData = useRaindrops(page+1, itemsPerPage, search)
    const nextPage = nextPageData.data?.items.length

    function changePage(direction: string) {
        if (direction === 'previous' && page > 0) setPage((prevPage) => prevPage - 1)
        if (direction === 'next' && nextPage) setPage((prevPage) => prevPage + 1)
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPage(0)
        setSearch(e.target.value)
    }

    return (
        <section
            className='
                    flex flex-col items-center 
                    w-11/12 sm:w-4/5
                '
        >
            <div
                className='
                    flex justify-end gap-2 
                    w-11/12 sm:w-3/5
                    mt-2
                    '
            >
                <Input placeholder='Search' className='w-2/5 sm:w-1/3' onChange={(e) => handleInputChange(e)} />
                <Button onClick={() => changePage('previous')} variant='outline' size='icon'
                    className={
                        page === 0
                            ? 'cursor-default hover:bg-inherit hover:text-slate-500 text-slate-500'
                            : ''
                    }
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button onClick={() => changePage('next')} variant='outline' size='icon'
                    className={
                        !nextPage
                        ? 'cursor-default hover:bg-inherit hover:text-slate-500 text-slate-500'
                        : ''
                    }>
                    <ChevronRight className='h-4 w-4' />
                </Button>
            </div>
            <div
                className='
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                    my-4 mx-2 sm:mx-8
                    w-11/12 sm:w-4/5 lg:w-11/12
                    text-slate-800
                    '
            >
                {
                    isLoading
                        ? <ReferencesSkeleton />
                        : isError
                            ? <p className='w-full text-lg col-span-full text-center pt-8'>An error occured. Please try again.</p>
                            : references !== undefined && references.items.length > 0
                                ? references?.items.map((item, index) => {
                                    return (
                                        <ReferenceCard item={item} key={index} />
                                    )
                                })
                                : <p className='w-full text-lg col-span-full text-center pt-8'>No references found for '<strong>{search}</strong>'. Please try again.</p>
                }
            </div>
        </section>
    )
}
