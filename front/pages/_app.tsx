import '../styles/globals.css'
import * as React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, makeVar } from '@apollo/client'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Signin_UserMutation } from '../graphql/codegen'


export const isSignInVar=makeVar<Signin_UserMutation>({})
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getlayout = Component.getLayout ?? ((page) => page)
  return (
    getlayout(
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  )
}

export default MyApp
