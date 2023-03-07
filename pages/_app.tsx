import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedProps}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
