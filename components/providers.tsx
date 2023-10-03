'use client'
import { QueryClientProvider, QueryClient } from "react-query"

export function Providers({children}: React.PropsWithChildren) {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
