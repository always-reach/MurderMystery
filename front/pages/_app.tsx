import '../styles/globals.css'
import * as React from 'react'
import { NextPage } from 'next'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createUploadLink } from "apollo-upload-client";
import type { AppProps } from 'next/app'
import { accessControl, GetAccessControl, useAccessControl } from '../access_control/AccessControl'
import HeaderPresenter from '@components/header/HeaderContainer'

console.log({endpoint:process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT})
const link = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
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
        <HeaderPresenter />
        <Component {...pageProps} />
    </ApolloProvider>

  )
}

export default MyApp
