import * as React from "react"
import { useReactiveVar } from "@apollo/client"
import Layout from "../layout/Layout"
import { isSignInVar, NextPageWithLayout } from "./_app"

const Top:NextPageWithLayout=()=>{
    const isSignIn = useReactiveVar(isSignInVar)
    console.log({isSignIn})
    return <div>{isSignIn}</div>
}

Top.getLayout = (page) => <Layout>{page}</Layout>
export default Top