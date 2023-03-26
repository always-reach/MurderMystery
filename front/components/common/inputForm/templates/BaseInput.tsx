import * as React from 'react'
import ErrorMessage from "@components/common/inputForm/error/ErrorMessage"

type InputProps = JSX.IntrinsicElements["input"]
export type BaseInputProps = InputProps & { error: boolean, errorMessage?: string, label?: string }

const BaseInput=React.memo(React.forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const { className, error, errorMessage, ...others } = props
    const defaultStyle = "border text-sm rounded-lg block w-full p-2.5"
    const colorStyle = "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    const errorStyle = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"

    const baseStyle = `${className ?? ""} ${defaultStyle} ${error ? errorStyle : colorStyle}`

    return (
        <div className="w-full mb-4">
            {props.label && <label className="text-sm font-medium text-gray-700" htmlFor={props.id}>{props.label}</label>}
            <input className={baseStyle} {...others} ref={ref}/>
            {error && <ErrorMessage >{errorMessage}</ErrorMessage>}
        </div>

    )
}))

export default BaseInput