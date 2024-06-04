import React, { Suspense } from 'react'
import { ThemeContextProvider } from './context/ThemeContextProvider'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import DrawerContextProvider from '@/context/DrawerContextProvider'
import ModalContextProvider from '@/context/ModalContextProvider'
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from '@/pages/ErrorPage'
import LoadingPage from '@/pages/LoadingPage'
import { ClerkProvider } from '@clerk/clerk-react'
import { AuthProvider } from './context/AuthContext'
import { CookiesProvider } from 'react-cookie'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: Infinity,
            refetchOnWindowFocus: false,
        },
    },
})

const Providers = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    return (
        <ErrorBoundary FallbackComponent={ErrorPage}>
            <ThemeContextProvider>
                <Suspense fallback={<LoadingPage />}>
                    <ClerkProvider publishableKey={PUBLISHABLE_KEY} navigate={navigate}>
                        <CookiesProvider>
                            <AuthProvider>
                                <QueryClientProvider client={queryClient}>
                                    <DrawerContextProvider>
                                        <ModalContextProvider>
                                            {children}
                                            <Toaster />
                                        </ModalContextProvider>
                                    </DrawerContextProvider>
                                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                                </QueryClientProvider>
                            </AuthProvider>
                        </CookiesProvider>
                    </ClerkProvider>
                </Suspense>
            </ThemeContextProvider>
        </ErrorBoundary>
    )
}

export default Providers