import { forwardRef } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"


const Password = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {


    return (
        <BaseInput
            type="password"
            {...props}
            autoComplete="current-password"
            placeholder="パスワード"
            ref={ref} />
    )
})

export default Password