import { getRaindropsList } from "@/lib/sdk"
import { convertDateFromIsoToDayMonthYear } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "../ui/badge"

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

export async function RaindropsPanel() {

    const raindrops: Raindrops = await getRaindropsList()

    return (
        <>
            <section
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
                                    <CardTitle><a href="{item.link}" target="_blank">{item.title}</a></CardTitle>
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
            </section>
        </>
    )
}
