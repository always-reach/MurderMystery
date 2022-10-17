
import Layout from "../layout/Layout"
import { NextPageWithLayout } from "./_app"

const SignUp:NextPageWithLayout=()=>{
    return <div>test</div>
}

SignUp.getLayout=(page)=><Layout>{page}</Layout>

export default SignUp