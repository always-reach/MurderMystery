import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache
})


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
