import { forwardRef, memo } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"


const TextForm = memo(forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {

    return (
        <BaseInput
            {...props}
            autoComplete="off"
            type="text"
            ref={ref} />)
}))

export default TextForm