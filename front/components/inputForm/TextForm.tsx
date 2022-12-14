import { forwardRef,memo } from "react"
import ErrorMessage from "../error/ErrorMessage"

type InputProps = JSX.IntrinsicElements["input"]
type TextFormProps = InputProps & { error?: boolean, errorMessage?: string }

const TextForm = memo(forwardRef<HTMLInputElement, TextFormProps>((props, ref) => {
    const { error, errorMessage, ...others } = props
    const defaultStyle = "border text-sm rounded-lg block w-full p-2.5"
    const colorStyle = "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const errorStyle = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    let TextFormStyle = ""
    if (error) {
        TextFormStyle = `${defaultStyle} ${errorStyle}`
    } else {
        TextFormStyle += `${defaultStyle} ${colorStyle}`
    }
    return (
        <div className="mb-4">
            <input
                {...others}
                autoComplete="off"
                type="text"
                className={TextFormStyle}
                ref={ref} />
            {error && <ErrorMessage >{errorMessage}</ErrorMessage>}
        </div>)
}))

export default TextForm