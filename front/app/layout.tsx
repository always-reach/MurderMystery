import './globals.css'
import Header from '../components/Header'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'


const cache = new InMemoryCache()
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}

      <ApolloProvider client={client}>
        <Header />
        <body>{children}</body>
      </ApolloProvider>
    </html>
  )
}
