
import { AiFillWarning } from 'react-icons/ai'

type ErrorCardProps={
    errorMessage:String
}
const ErrorCard:React.FC<ErrorCardProps> = (props) => {
    return (
        <div className={"flex border-2 bg-red-200 border-red-300 rounded-sm mt-8 w-8/12"}>
             <AiFillWarning size={50} color="#800000" style={{margin:4}}/>
            <p className="text-2xl text-red-900 my-4">{props.errorMessage}</p>
        </div>)
}
export default ErrorCard

