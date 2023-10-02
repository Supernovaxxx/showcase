'use client'
import { useEffect, useState } from "react"
import { getRaindropsList } from "@/lib/sdk"
import { convertDateFromIsoToDayMonthYear } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
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
            <section>
                <div className="flex w-11/12 sm:w-4/5 gap-2 justify-end items-center">
                    <Button onClick={() => changePage('previous')} variant='outline' size='icon'
                        className={
                            page === 0
                                ? 'cursor-default hover:bg-inherit'
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
        flex flex-col justify-center items-start gap-y-2 sm:gap-4
        my-4 mx-2 sm:mx-8
        w-11/12 sm:w-4/5
        text-slate-800
      '
                >
                    {
                        raindrops.items.map((item, index) => {
                            return (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardDescription>{convertDateFromIsoToDayMonthYear(item.created)}</CardDescription>
                                        <CardTitle className="hover:opacity-80"><a href={item.link} target="_blank">{item.title}</a></CardTitle>
                                    </CardHeader>
                                    <CardContent className='flex gap-2'>
                                        {
                                            item.tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)
                                        }
                                    </CardContent>
                                </Card>
                            )
                        }
                        )
                    }
                </div>
            </section>
        )
}
