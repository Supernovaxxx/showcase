"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ThemeToggler() {
    const { setTheme } = useTheme()

    return (
        <div className='flex justify-end items-center gap-2 px-8 py-4'>
            <Button onClick={() => setTheme("light")}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
            </Button>
            <Button onClick={() => setTheme("dark")}>
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            </Button>
        </div>
    )
}
