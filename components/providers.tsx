'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

interface ProvidersProps extends ThemeProviderProps {
    children: React.ReactNode
}

export function Providers({ children, ...props }: ProvidersProps) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <NextThemesProvider {...props}>
                {children}
            </NextThemesProvider>
        </QueryClientProvider>
    )
}
