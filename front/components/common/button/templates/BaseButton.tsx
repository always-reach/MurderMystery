type InputProps = JSX.IntrinsicElements["button"]
export type BaseButtonProps = InputProps
const BaseButton: React.FC<BaseButtonProps> = (props) => {
    const { children, className, ...otherProps } = props
    const buttonClassName = `${className} border-2 border-gray-100 bg-cyan-500 rounded-lg text-gray-100 px-16 py-2 block mb-4`
    return (
        <button className={buttonClassName}
            {...otherProps}>
            {children}
        </button>)
}

export default BaseButton