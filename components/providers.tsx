'use client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'next-themes'


export function Providers({ children }: React.PropsWithChildren) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="data-theme"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    )
}
