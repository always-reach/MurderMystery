import * as React from "react"
import { NextPageWithLayout } from "./_app"
import { useGet_All_Game_MastQuery } from "../graphql/codegen"
import CardContainer from "@components/cards/normalCard/CardContainer"
import useAuth from "@hooks/useAuth"

type PlayedUsers={
    __typename?: "UserType" | undefined;
    id: string;
}

const Top: NextPageWithLayout = () => {
    const { loading, data, refetch } = useGet_All_Game_MastQuery()
    const auth=useAuth()
    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>

    const isPlayed=(users:PlayedUsers[]):boolean=>{
        return users.some(element=>element.id===auth.state?.id)
    }

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
                    isPlayed={isPlayed(element.playedUsers)} />
            )}
        </div>)
}

Top.getAccessControl = (user) => {
    return null
}
export default Top