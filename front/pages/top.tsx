import * as React from "react"
import { NextPageWithLayout } from "./_app"
import Layout from "../layout/Layout"
import Card from "../components/Card"
import { useGet_All_Game_MastQuery } from "../graphql/codegen"

const Top: NextPageWithLayout = () => {
    const { loading, data, refetch } = useGet_All_Game_MastQuery()

    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>
    return (
        <div className="flex flex-wrap">
            {data?.allGameMasts?.map((element) =>
                <Card
                    id={element.id}
                    title={element.title}
                    auther={element.auther}
                    playTime={element.playTimeMinute}
                    image={element.image}
                    minPlayer={element.minPlayerCount}
                    maxPlayer={element.maxPlayerCount}
                    note={element.note} />
            )}
        </div>)
}

Top.getLayout = (page) => <Layout>{page}</Layout>
Top.getAccessControl = (user) => {
    return user.signinUser ? null : { type: "replace", destination: "/signin" }
}
export default Top