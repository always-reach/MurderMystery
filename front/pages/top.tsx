import * as React from "react"
import Layout from "../layout/Layout"
import { isSignInVar, NextPageWithLayout } from "./_app"

const Top:NextPageWithLayout=()=>{
    return <div>{isSignInVar().signinUser?.user?.id}</div>
}

Top.getLayout = (page) => <Layout>{page}</Layout>
Top.getAccessControl=(user)=>{
    return user.signinUser ?null:{type:"replace",destination:"/signin"}
}
export default Top