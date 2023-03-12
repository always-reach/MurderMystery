import * as React from 'react'

type CardProps = {
    children: React.ReactNode
    className?: string
}
const BaseCard: React.FC<CardProps> = (props) => {

    const clsssName = `flex rounded-lg border-2 shadow-md ${props.className}`

    return (
        <div className={clsssName}>
            {props.children}
        </div>)
}
export default BaseCard

