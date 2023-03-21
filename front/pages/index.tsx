import * as React from 'react'
import { useRouter } from 'next/router';
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    // /testにアクセスした場合は/signinにリダイレクトする
    router.push('/signin');
  }, []);

  return (
    <></>
  )
}

export default Home
