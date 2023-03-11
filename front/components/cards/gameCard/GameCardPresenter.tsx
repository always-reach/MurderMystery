import * as React from 'react'
import Image, { StaticImageData } from 'next/image';
import BaseCard from '@components/cards/templates/BaseCard';


export type CardProps = {
    gameId: string
    title: string
    auther: string
    playTime: number | null
    image?: string | StaticImageData
    minPlayer: number
    maxPlayer: number
    note: string
    isPlayed: boolean
    userId: string | undefined
    updateGame: (userId: number, gameId: number) => Promise<void>
}
const GameCardPresenter: React.FC<CardProps> = (props) => {

    return (
        <BaseCard className=" border-gray-200 mx-auto my-8">
            {props.image && <Image width={248} height={248} src={props.image} />}
            <div className="flex-col">
                <div className='text-5xl m-4'>{props.title}</div>
                {props.auther && <div className='ml-8 text-xl'>著者:{props.auther}</div>}
                {props.playTime && <div className='ml-8 text-xl'>プレイ時間:{props.playTime}分</div>}
                <div className='ml-8 text-xl'>プレイ人数:{props.minPlayer}~{props.maxPlayer}人</div>
                {props.note && <div className='ml-8 text-xl'>備考:{props.note}</div>}
            </div>
        </BaseCard>
    )
}

export default GameCardPresenter