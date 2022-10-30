import * as React from 'react'

type CardProps={
    title:string
    image?:string|undefined|null
}
const Card = React.memo((props:CardProps) => {
    const image=props.image?? undefined
    return (
        <div className="rounded-lg border border-gray-200 w-11/12 mx-auto">
            {props.title}
            <img width={193} src={`http://localhost:8000/media/${image}`}/>
        </div>
    )
})

export default Card