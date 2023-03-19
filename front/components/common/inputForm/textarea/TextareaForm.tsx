import { forwardRef, memo, TextareaHTMLAttributes } from "react"
import ErrorMessage from "@components/common/inputForm/error/ErrorMessage"

type TextareaFormProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error: boolean,
    errorMessage: string,
    label?: string
}

const TextareaForm = memo(forwardRef<HTMLTextAreaElement, TextareaFormProps>((props, ref) => {
    const { id,className, label, error, errorMessage, ...others } = props
    const defaultStyle = "border text-sm rounded-lg block w-full p-2.5"
    const colorStyle = "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const errorStyle = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

    const baseStyle = `${className ?? ""} ${defaultStyle} ${error ? errorStyle : colorStyle}`

    return (
        <div className="flex flex-col">
            {label && <label htmlFor={id}>{label}</label>}
            <textarea
                className={baseStyle}
                {...others}
                ref={ref}
            />
            {error && <ErrorMessage >{errorMessage}</ErrorMessage>}
        </div>)
}))

export default TextareaForm