import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { RecoilRoot } from 'recoil'
import Layout from 'components/Layout'
import { Alert } from 'components/Alert'

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  return (
    <ThemeProvider attribute="class">
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Hydrate state={pageProps.dehydratedProps}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Hydrate>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
