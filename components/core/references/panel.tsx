'use client'
import { useEffect, useState } from 'react'

import { Button, ButtonProps } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from '@/components/site/icons'

import { ReferenceCard, ReferencesSkeleton } from './index'

import { cn } from '@/lib/utils'
import { useWindowProperties } from '@/hooks/useWindowProperties'
import { useReferences } from '@/hooks/useReferences'

export function ReferencesPanel() {

    const [search, setSearch] = useState<string>('')
    const {
        pageData,

        perPage,
        setPerPage,

        page,
        isFirstPage,
        isLastPage,

        moveToFirstPage,
        moveToPreviousPage,
        moveToNextPage,

        isLoading,
        isFetching,
        isError,
    } = useReferences(search)

    const window = useWindowProperties()

    useEffect(() => {
        setPerPage(window.width > 1024 ? 6 : 4)
    }, [window.width])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
        moveToFirstPage()
    }

    return (
        <section className='flex flex-col items-center w-11/12 sm:w-4/5'>
            <div className='flex justify-end gap-2 w-11/12 sm:w-3/5 mt-2'>
                <Input placeholder='Search' className='w-2/5 sm:w-1/3' onChange={(e) => handleInputChange(e)} />
                <ChangePageButton
                    changePage={moveToPreviousPage}
                    status={isLoading || isFetching || isFirstPage ? 'disabled' : 'default'}
                >
                    <ChevronLeft className='h-4 w-4' />
                </ChangePageButton>
                <div className='flex items-center gap-2'>
                    {page}
                </div>
                <ChangePageButton
                    changePage={moveToNextPage}
                    status={isLoading || isFetching || isLastPage ? 'disabled' : 'default'}
                >
                    <ChevronRight className='h-4 w-4' />
                </ChangePageButton>
            </div>
            <div className='
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                    my-4 mx-2 sm:mx-8
                    w-11/12 sm:w-4/5 lg:w-11/12
                    text-slate-800
            '>
                {
                    isLoading || isFetching
                        ? <ReferencesSkeleton perPage={perPage} />
                        : isError
                            ? <p className='w-full text-lg col-span-full text-center pt-8'>
                                An error occured. Please try again.
                            </p>
                            :
                            pageData?.length
                                ? pageData.map((item, index) => {
                                    return (
                                        <ReferenceCard item={item} key={index} />
                                    )
                                })
                                : (
                                    <p className='w-full text-lg col-span-full text-center pt-8'>
                                        No references found for '<strong>{search}</strong>'. Please try again.
                                    </p>
                                )
                }
            </div>
        </section >
    )
}

interface ChangePageButtonProps extends ButtonProps {
    changePage: () => void
}

function ChangePageButton({ children, className, status, changePage, ...props }: ChangePageButtonProps) {
    return (
        <Button
            variant='outline'
            size='icon'
            status={status}
            {...props}
            onClick={() => status == 'default' && changePage()}
            className={cn(
                'cursor-default hover:bg-muted/50 hover:border-slate-200',
                className
            )}
        >
            {children}
        </Button>
    )
}
