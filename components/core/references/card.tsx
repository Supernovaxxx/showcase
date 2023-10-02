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
}

export function ReferenceCard({ item }: ReferenceCardProps) {
    return (
        <Card className='max-w-sm'>
            <CardHeader className="min-h-[9.125rem]">
                <CardTitle><a className="hover:opacity-80 hover:underline" href={item.link} target="_blank">{item.title}</a>  <span className="text-xs capitalize">{item.type}</span></CardTitle>
                <CardDescription>Pinned on <strong>{convertDateFromIsoToDayMonthYear(item.created)}</strong></CardDescription>
                <CardDescription className="text-sm small-caps"><a className="hover:opacity-80 hover:underline" href={`http://${item.domain}`} target="_blank">{item.domain}</a></CardDescription>
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
