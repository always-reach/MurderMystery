import { forwardRef, memo } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"


const DateForm = memo(forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {

    return (
        <BaseInput
            {...props}
            type="date"
            ref={ref} />)
}))

export default DateForm