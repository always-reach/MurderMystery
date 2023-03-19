import * as React from 'react'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from "../_app"

const Game: NextPageWithLayout = () => {
  const router=useRouter()
  
  return (
    <div>
      <h1>Game {router.query.id}</h1>
      {/* ここにコンテンツを追加 */}
    </div>
  );
}

Game.getAccessControl = (isSignIn) => {
  return !isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default Game
