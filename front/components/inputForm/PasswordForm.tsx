import { forwardRef } from "react"

type InputProps = JSX.IntrinsicElements["input"]


const PasswordForm = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <div className="w-full mb-6">
            <input type="password"
                {...props}
                autoComplete="current-password"
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="パスワード"
                ref={ref} />
        </div>

    )
})

export default PasswordForm