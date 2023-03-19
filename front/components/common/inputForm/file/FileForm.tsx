import { forwardRef } from "react"
import BaseInput, { BaseInputProps } from "@components/common/inputForm/templates/BaseInput"



const FileForm = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => {
    const { className, ...others } = props
    const customClassName = `${props.className ?? ""}`
    return (
        <BaseInput
            className={customClassName}
            {...others}
            type="file"
            ref={ref} />
        
    )
})
FileForm.displayName="File"
export default FileForm