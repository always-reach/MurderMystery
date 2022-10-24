import { forwardRef } from "react"
import ErrorMessage from "../error/ErrorMessage"

type InputProps = JSX.IntrinsicElements["input"]
type PasswordProps = InputProps & { error?: boolean, errorMessage?: string }

const PasswordForm = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
    const { error, errorMessage, ...others } = props
    const defaultStyle = "border text-sm rounded-lg block w-full p-2.5 "
    const colorStyle = "bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const errorStyle = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    let PasswordStyle = ""
    if (error) {
        PasswordStyle = `${defaultStyle} ${errorStyle}`
    } else {
        PasswordStyle += `${defaultStyle} ${colorStyle}`
    }
    
    return (
        <div className="w-full mb-4">
            <input type="password"
                {...others}
                autoComplete="current-password"
                className={PasswordStyle}
                placeholder="パスワード"
                ref={ref} />
            {error && <ErrorMessage >{errorMessage}</ErrorMessage>}
        </div>

    )
})

export default PasswordForm