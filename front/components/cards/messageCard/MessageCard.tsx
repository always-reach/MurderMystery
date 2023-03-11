import BaseCard from "@components/cards/templates/BaseCard"


type MessageCardProps={
    message:string
    className?:string
}
const MessageCard:React.FC<MessageCardProps> = (props) => {
    const className=`border-gray-200 ${props.className}`
    return (
        <BaseCard className={className}>
            <p className="m-4">{props.message}</p>
        </BaseCard>
    )
}
export default MessageCard

