'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ReferenceCard } from "@/components/core/references"
import { useRaindrops } from "@/hooks/useRaindrops"
import { Input } from "@/components/ui/input"
import { ReferencesSkeleton } from "./skeleton"

export interface Raindrop {
    title: string
    link: string
    created: string
    tags: string[]
    type: string
    cover: string
    domain: string
}

export interface Raindrops {
    result: boolean
    items: Raindrop[]
    count: number
    collectionId: number
}

export function ReferencesPanel() {
    var [page, setPage] = useState<number>(0)
    var [search, setSearch] = useState<string>('')

    const { data, isLoading, isError } = useRaindrops(page, search)
    const references = data

    function changePage(direction: string) {
        if (direction === 'previous' && page > 0) setPage((prevPage) => prevPage - 1)
        if (direction === 'next') setPage((prevPage) => prevPage + 1)
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
                <Input placeholder="Search" className="w-2/5 sm:w-1/3" onChange={(e) => handleInputChange(e)} />
                <Button onClick={() => changePage('previous')} variant='outline' size='icon'
                    className={
                        page === 0
                            ? 'cursor-default hover:bg-inherit hover:text-slate-500 text-slate-500'
                            : ''
                    }
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button onClick={() => changePage('next')} variant='outline' size='icon'>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div
                className='
                    grid grid-cols-1 md:grid-cols-2 gap-4
                    my-4 mx-2 sm:mx-8
                    w-11/12 sm:w-3/5
                    text-slate-800
                    '
            >
                {
                    isLoading
                        ? <ReferencesSkeleton />
                        : isError
                            ? <p className="w-full text-lg col-span-full text-center pt-8">An error occured. Please try again.</p>
                            : references !== undefined && references.items.length > 0
                                ? references?.items.map((item, index) => {
                                    return (
                                        <ReferenceCard item={item} key={index} />
                                    )
                                })
                                : <p className="w-full text-lg col-span-full text-center pt-8">No references found for "<strong>{search}</strong>". Please try again.</p>
                }
            </div>
        </section>
    )
}
