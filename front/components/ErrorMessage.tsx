
type ErrorMessage={
    children:React.ReactNode
}

const ErrorMessage:React.FC<ErrorMessage>=(props)=>{
    return (
        <p className="mt-1 mb-4 text-sm text-red-600 dark:text-red-500 block">{props.children}</p>
    )
}

export default ErrorMessage