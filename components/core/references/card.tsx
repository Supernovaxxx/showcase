import { Raindrop } from "./panel"
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

interface ReferenceCardProps {
    item: Raindrop
    index: number
}

export function ReferenceCard({ item, index }: ReferenceCardProps ) {
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
