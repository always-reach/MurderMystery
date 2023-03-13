import * as React from "react"
import { NextPageWithLayout } from "../_app"
import useAuth from "@hooks/useAuth"
import { useGet_All_Game_MastQuery } from "@graphql/codegen";
import GameListTable, { Game } from "@components/mygame/table/GameListTable";
import Button from "@components/common/button/Button";
import router from "next/router";

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
            <div className="flex">
                <div className="ml-auto pt-10 pr-20">
                    <Button onClick={()=>{router.push("/gamelist/create")}}>追加する</Button>
                </div>
            </div>
            <div className="mx-auto w-4/5">
                <GameListTable gameList={createRow()} />
            </div>
        </div>)
}

GameList.getAccessControl = (isSignIn) => {
    return !isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default GameList