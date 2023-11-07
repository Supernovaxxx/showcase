import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ReferencesSkeleton({ perPage }: { perPage: number }) {
  const skeletons = Array.from({ length: perPage })

  return (
    <>
      {skeletons.map((item, index) => (
        <SingleReferenceSkeleton key={index} />
      ))}
    </>
  )
}

function SingleReferenceSkeleton() {
    return (
        <Card className='max-w-sm animate-pulse rounded-md bg-secondary'>
            <CardHeader className='min-h-[9.125rem]'>
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-6 w-4/5 rounded' />
                <Skeleton className='h-6 w-3/4 rounded' />
                <Skeleton className='h-4 w-3/5 rounded mt-2' />
                <Skeleton className='h-3 w-1/3 rounded mt-2' />
            </CardHeader>
            <CardContent>
                <Skeleton className='h-32 w-11/12 rounded' />
            </CardContent>
            <CardFooter>
                <Skeleton className='h-5 w-1/5 rounded-xl' />
            </CardFooter>
        </Card>
    )
}
