import { forwardRef } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"


const Password = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const { placeholder, ...others } = props

    return (
        <BaseInput
            type="password"
            {...others}
            autoComplete="current-password"
            placeholder={placeholder ?? "パスワード"}
            ref={ref} />
    )
})
Password.displayName = "Password"
export default Password