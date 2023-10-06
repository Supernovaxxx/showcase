'use client'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LucideIcons } from '@/components/site/icons'
import { usePaginetedReferences } from '@/hooks/useRaindrops'

import { ReferenceCard, ReferencesSkeleton } from './index'


export function ReferencesPanel() {
    const { ChevronLeft, ChevronRight } = LucideIcons

    const [search, setSearch] = useState<string>('')
    const [isBigScreen, setIsBigScreen] = useState<boolean>(window.innerWidth >= 1024)
    const {
        pageData,
        index,
        setIndex,
        firstIndexNextPage,
        perPage,
        setPerPage,
        page,
        isFirstPage,
        isLastPage,
        changePage,
        nextPage,
        previousPage,
        isLoading,
        isError
    } = usePaginetedReferences(0, search)

    window.addEventListener('resize', () => {
        const isBigScreen = window.innerWidth >= 1024
        setIsBigScreen(isBigScreen)
    })

    useEffect(() => {
        function handleResize() {
            if (isBigScreen) {
                setPerPage(6)
            } else {
                setPerPage(4)
            }
        }
        handleResize()
    }, [isBigScreen])

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setIndex(0)
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
                        isFirstPage
                            ? 'cursor-default hover:bg-inherit hover:text-slate-500 text-slate-500'
                            : ''
                    }
                >
                    <ChevronLeft className='h-4 w-4' />
                </Button>
                <Button onClick={() => changePage('next')} variant='outline' size='icon'
                    className={
                        isLastPage
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
                    ? <ReferencesSkeleton perPage={perPage} />
                    : isError
                        ? <p className='w-full text-lg col-span-full text-center pt-8'>An error occured. Please try again.</p>
                        :
                    pageData.length > 0
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
        </section>
    )
}
