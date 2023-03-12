import GameCardPresenter from '@components/cards/gameCard/GameCardPresenter'
import { usePlayed_GameMutation } from '@graphql/codegen'
import useAuth from '@hooks/useAuth'
import * as React from 'react'


type CardPresenterProps = {
    gameId: string
    title: string
    auther: string
    playTime: number | null
    image?: string
    minPlayer: number
    maxPlayer: number
    note: string
    isPlayed: boolean
}

const GameCardContainer = React.memo((props: CardPresenterProps) => {
    const auth = useAuth()
    const [updatePlayedGame] = usePlayed_GameMutation()

    const updateGame = async (userId: number, gameId: number) => {
        await updatePlayedGame({
            variables: {
                userId: userId,
                gameId: gameId
            }
        })
    }
    return (
        <GameCardPresenter
            {...props}
            userId={auth.state?.id}
            updateGame={updateGame} />)
})

export default GameCardContainer