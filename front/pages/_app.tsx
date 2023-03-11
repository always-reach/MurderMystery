import '../styles/globals.css'
import * as React from 'react'
import { NextPage } from 'next'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'

import type { AppProps } from 'next/app'
import { accessControl, GetAccessControl, useAccessControl } from '../access_control/AccessControl'
import Header from '@components/container/HeaderContainer'

const link = createHttpLink({
  uri: "http://localhost:8000/graphql",
  credentials: "include",
})
const cache = new InMemoryCache()
export const client = new ApolloClient({
  cache,
  link
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getAccessControl?: GetAccessControl
}


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { getAccessControl = accessControl } = Component
  useAccessControl(getAccessControl)
  return (
    <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
    </ApolloProvider>

  )
}

export default MyApp
