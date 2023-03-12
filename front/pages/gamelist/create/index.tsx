
import * as React from "react"
import { NextPageWithLayout } from "../../_app"
import Text from "@components/common/inputForm/text/Text"

const GameCreate: NextPageWithLayout = () => {

    return (
        <div className="w-3/5 mx-auto py-4">
            <Text placeholder="作品名"/>
        </div>)
}

GameCreate.getAccessControl = (user) => {
    return null
}
export default GameCreate