import { forwardRef } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"



const Email = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {

    return (
        <BaseInput
            {...props}
            autoComplete="email"
            type="email"
            placeholder="メールアドレス"
            ref={ref} />
    )
})
Email.displayName="Email"
export default Email