
import * as React from "react"
import { NextPageWithLayout } from "../../_app"
import TextForm from "@components/common/inputForm/text/TextForm"

const GameCreate: NextPageWithLayout = () => {

    return (
        <div className="w-3/5 mx-auto py-4">
            <TextForm placeholder="作品名" required/>
            <TextForm placeholder="作者" />
            
            
        </div>)
}

GameCreate.getAccessControl = (user) => {
    return null
}
export default GameCreate