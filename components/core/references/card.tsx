import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Favicon } from '@/components/site/icons'
import { convertDateFromIsoToDayMonthYear } from '@/lib/utils'
import { Reference } from '@/types/core'


interface ReferenceCardProps {
    item: Reference
}

export function ReferenceCard({ item }: ReferenceCardProps) {

    return (
        <Card
            className='
                max-w-xs
                break-words 
                shadow-inner 
                hover:shadow-md hover:drop-shadow-md hover:scale-105 
                ease-in-out duration-200
                '
        >
            <a className='hover:opacity-90' href={item.link} target='_blank'>
                <CardHeader className='min-h-[9.125rem]'>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                        Pinned on {' '}
                        <strong>{convertDateFromIsoToDayMonthYear(item.created)}</strong>
                    </CardDescription>
                    <CardDescription className='text-sm small-caps'>
                        {item.domain} {' '}
                        <Favicon domain={item.domain} />
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center aspect-video'>
                    <img src={item.cover} className='w-full h-full rounded' />
                </CardContent>
                <CardFooter className='flex gap-2'>
                    {
                        item.tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)
                    }
                </CardFooter>
            </a>
        </Card>
    )
}
