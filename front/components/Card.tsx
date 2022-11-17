import * as React from 'react'
import { usePlayed_GameMutation } from '../graphql/codegen'
import { isSignInVar } from '../pages/_app'
import PrimaryButton from './button/primaryButton'

type CardProps = {
    id: string
    title: string
    auther: string | undefined | null
    playTime: number | undefined | null
    image?: string | undefined | null
    minPlayer: number
    maxPlayer: number
    note: string | undefined | null
    playedUsers:{
        __typename?: "UserType" | undefined;
        id: string;
    }[]

}
const Card = React.memo((props: CardProps) => {
    const [updatePlayedGame] = usePlayed_GameMutation()

    const image = props.image ?? undefined

    const onClick = async() => {
        if (isSignInVar().signinUser?.user) {
            await updatePlayedGame({ 
                variables: { 
                    userId: Number(isSignInVar().signinUser?.user?.id),
                     gameId: Number(props.id) 
                    }
                 })
        }
    }

    return (
        <div className="rounded-lg border border-gray-200 shadow-md w-5/12 mx-auto my-8 flex">
            <img width={248} src={`http://localhost:8000/media/${image}`} />
            <div className="flex-col">
                <div className='text-5xl m-4'>{props.title}</div>
                {props.auther && <div className='ml-8 text-xl'>著者:{props.auther}</div>}
                {props.playTime && <div className='ml-8 text-xl'>プレイ時間:{props.playTime}分</div>}
                <div className='ml-8 text-xl'>プレイ人数:{props.minPlayer}~{props.maxPlayer}人</div>
                {props.note && <div className='ml-8 text-xl'>備考:{props.note}</div>}
                {props.playedUsers.some(user=>user.id===isSignInVar().signinUser?.user?.id) 
                ? <PrimaryButton label='もう遊んだ'/> 
                :<PrimaryButton label='遊んだことがある!' onClick={onClick} />}
            </div>
        </div>
    )
})

export default Card