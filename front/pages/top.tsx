import * as React from "react"
import { NextPageWithLayout } from "./_app"
import { useGet_All_Game_MastQuery } from "../graphql/codegen"
import CardContainer from "@components/container/CardContainer"


const Top: NextPageWithLayout = () => {
    const { loading, data, refetch } = useGet_All_Game_MastQuery()
    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>
    return (
        <div className="flex flex-wrap">
            {data?.allGameMasts?.map((element) =>
                <CardContainer
                    key={element.id}
                    gameId={element.id}
                    title={element.title}
                    auther={element.auther ?? ""}
                    playTime={element.playTimeMinute ?? null}
                    image={element.image ?? ""}
                    minPlayer={element.minPlayerCount}
                    maxPlayer={element.maxPlayerCount}
                    note={element.note ?? ""}
                    playedUsers={element.playedUsers} />
            )}
        </div>)
}

Top.getAccessControl = (user) => {
    return null
}
export default Top