import * as React from "react"
import Card from "@/components/Card"
import { useGet_All_Game_MastQuery } from "@/graphql/codegen"

const Top = () => {
    const { loading, data, refetch } = useGet_All_Game_MastQuery()

    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>
    return (
        <div className="flex flex-wrap">
            {data?.allGameMasts?.map((element) =>
                <Card
                    key={element.id}
                    id={element.id}
                    title={element.title}
                    auther={element.auther}
                    playTime={element.playTimeMinute}
                    image={element.image}
                    minPlayer={element.minPlayerCount}
                    maxPlayer={element.maxPlayerCount}
                    note={element.note}
                    playedUsers={element.playedUsers} />
            )}
        </div>)
}

export default Top