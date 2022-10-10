import { forwardRef } from "react"

type InputProps = JSX.IntrinsicElements["input"]

const EmailForm = forwardRef<HTMLInputElement,InputProps>((props,ref) => {
    return (
        <input
            {...props}
            autoComplete="email"
            type="email"
            className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="メールアドレス"
            ref={ref} />


    )
})

export default EmailForm