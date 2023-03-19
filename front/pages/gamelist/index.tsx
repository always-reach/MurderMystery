import * as React from "react"
import { NextPageWithLayout } from "../_app"
import useAuth from "@hooks/useAuth"
import { useGet_All_Game_MastQuery, useGet_Game_Mast_By_UserQuery } from "@graphql/codegen";
import GameListTable, { Game } from "@components/mygame/table/GameListTable";
import Button from "@components/common/button/Button";
import router from "next/router";
import { createImageURL } from "@utils/strUtils";

const GameList: NextPageWithLayout = () => {
    const auth=useAuth()
    const { loading, data, refetch } = useGet_Game_Mast_By_UserQuery({variables:{User:Number(auth.state?.id)}})
    React.useEffect(() => { refetch() }, [])
    if (loading) return <div>loading</div>

    const createRow = (): Game[] | null => {
        console.log(data)
        
        if (!data) return null
        if (!data.gameByUser) return null
        return data.gameByUser.map(element => ({ title: element!.title, image: createImageURL(element!.image), date:element!.playedAt }))
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
    console.log({GameList:isSignIn})
    return !isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default GameList