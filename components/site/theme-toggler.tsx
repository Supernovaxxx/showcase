'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'


export function ThemeToggler() {
    const { theme, setTheme } = useTheme()

    return (
        <div className='flex justify-end items-center gap-2 px-8 py-4'>
            <Button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                {theme === 'light'
                    ? <Moon className='h-[1.2rem] w-[1.2rem]' />
                    : <Sun className='h-[1.2rem] w-[1.2rem]' />
                }
            </Button>
        </div>
    )
}
