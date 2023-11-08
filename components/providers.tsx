'use client'

import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'next-themes'


export function Providers({ children }: React.PropsWithChildren) {
    const queryClient = new QueryClient()

    // Prevent hydration mismatch - provide context to UI rendering after mounting it on client
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute='data-theme'
                enableSystem
                defaultTheme='dark'
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}
