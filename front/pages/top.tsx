import * as React from "react"
import { NextPageWithLayout } from "./_app"
import Layout from "../layout/Layout"
import Card from "../components/Card"
import { useGet_All_Game_MastQuery } from "../graphql/codegen"

const Top:NextPageWithLayout=()=>{
    const {loading,error,data}=useGet_All_Game_MastQuery()

    if(loading) return <div>loading</div>
    console.log(data)
    return (
    <div>
        {data?.allGameMasts?.map((element)=><Card title={element.title} image={element.image}/>)}
    </div>)
}

Top.getLayout = (page) => <Layout>{page}</Layout>
Top.getAccessControl=(user)=>{
    return user.signinUser ?null:{type:"replace",destination:"/signin"}
}
export default Top