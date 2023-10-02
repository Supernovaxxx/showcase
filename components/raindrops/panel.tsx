'use client'
import { useEffect, useState } from "react"
import { getRaindropsList } from "@/lib/sdk"
import { convertDateFromIsoToDayMonthYear } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Raindrop {
    title: string
    link: string
    created: string
    tags: string[]
    type: string
    cover: string
}

interface Raindrops {
    result: boolean
    items: Raindrop[]
    count: number
    collectionId: number
}

export function RaindropsPanel() {
    var [page, setPage] = useState<number>(0)
    const [raindrops, setRaindrops] = useState<Raindrops>()

    useEffect(() => {
        async function fetchData() {
            const raindrops: Raindrops = await getRaindropsList(page)
            setRaindrops(raindrops)
        }
        fetchData()
    }, [page])

    function changePage(direction: string) {
        if (direction === 'previous' && page > 0) setPage((prevPage) => prevPage - 1)
        if (direction === 'next') setPage((prevPage) => prevPage + 1)
    }

    if (raindrops)
        return (
            <section
                className='
                    flex flex-col items-center 
                    w-11/12 sm:w-4/5
                '
            >
                <div
                    className='
                        flex justify-end items-center gap-2 
                        w-11/12 sm:w-3/5
                    '
                >
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
                        raindrops.items.map((item, index) => {
                            return (
                                <Card key={index} className='max-w-sm'>
                                    <CardHeader className="min-h-[9.125rem]">
                                        <CardTitle><a className="hover:opacity-80 hover:underline" href={item.link} target="_blank">{item.title}</a> · <span className="text-xs capitalize">{item.type}</span></CardTitle>
                                        <CardDescription>Pinned on <strong>{convertDateFromIsoToDayMonthYear(item.created)}</strong></CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex justify-center">
                                        <img src={item.cover} className="w-64 h-32 rounded" />
                                    </CardContent>
                                    <CardFooter className='flex gap-2'>
                                        {
                                            item.tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)
                                        }
                                    </CardFooter>
                                </Card>
                            )
                        }
                        )
                    }
                </div>
            </section>
        )
}
