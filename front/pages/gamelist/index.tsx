import * as React from "react"
import { NextPageWithLayout } from "../_app"
import useAuth from "@hooks/useAuth"
import { useGet_All_Game_MastQuery } from "@graphql/codegen";
import GameListTable, { Game } from "@components/mygame/table/GameListTable";

const GameList: NextPageWithLayout = () => {
    const { loading, data, refetch } = useGet_All_Game_MastQuery()
    const auth = useAuth()
    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>

    const createRow = (): Game[] | null => {
        if (!data) return null
        if (!data.allGameMasts) return null
        return data.allGameMasts.map(element => ({ title: element.title, image: element.image, date: new Date() }))
    }

    return (
        <div >
            <GameListTable gameList={createRow()} />
        </div>)
}

GameList.getAccessControl = (user) => {
    return null
}
export default GameList