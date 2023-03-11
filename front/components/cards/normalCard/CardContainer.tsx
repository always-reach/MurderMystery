import CardPresenter from '@components/cards/normalCard/CardPresenter'
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

const CardContainer = React.memo((props: CardPresenterProps) => {
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
        <CardPresenter
            {...props}
            userId={auth.state?.signinUser?.user?.id}
            updateGame={updateGame} />)
})

export default CardContainer