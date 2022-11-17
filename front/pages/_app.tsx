import '../styles/globals.css'
import * as React from 'react'
import { NextPage } from 'next'
import { ApolloClient, InMemoryCache, ApolloProvider, makeVar} from '@apollo/client'


import type { AppProps } from 'next/app'
import { accessControl, GetAccessControl, useAccessControl } from '../access_control/AccessControl'
import { Signin_UserMutation } from '../graphql/codegen'



export const isSignInVar = makeVar<Signin_UserMutation>({})
const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
  getAccessControl?: GetAccessControl
}


type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getlayout = Component.getLayout ?? ((page) => page)
  const { getAccessControl = accessControl } = Component
  useAccessControl(getAccessControl)
  return (
    getlayout(
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    )
  )
}

export default MyApp
