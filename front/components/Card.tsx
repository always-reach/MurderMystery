import * as React from 'react'
import PrimaryButton from './button/primaryButton'

type CardProps={
    title:string
    auther:string|undefined|null
    playTime:number|undefined|null
    image?:string|undefined|null
    minPlayer:number
    maxPlayer:number
    note:string|undefined|null

}
const Card = React.memo((props:CardProps) => {
    const image=props.image?? undefined
    return (
        <div className="rounded-lg border border-gray-200 shadow-md w-5/12 mx-auto my-8 flex">
            <img width={248} src={`http://localhost:8000/media/${image}`}/>
            <div className="flex-col">
                <div className='text-5xl m-4'>{props.title}</div>
                {props.auther && <div className='ml-8 text-xl'>著者:{props.auther}</div>}
                {props.playTime && <div className='ml-8 text-xl'>プレイ時間:{props.playTime}分</div>}
                <div className='ml-8 text-xl'>プレイ人数:{props.minPlayer}~{props.maxPlayer}人</div>
                {props.note && <div className='ml-8 text-xl'>備考:{props.note}</div>}
                <PrimaryButton label='遊んだことがある!'/>
            </div>
        </div>
    )
})

export default Card