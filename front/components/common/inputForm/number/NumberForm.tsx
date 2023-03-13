import { forwardRef, memo } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"

const NumberForm = memo(forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {

    return (
        <BaseInput
            {...props}
            autoComplete="off"
            type="number"
            ref={ref} />)
}))

export default NumberForm