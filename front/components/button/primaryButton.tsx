type InputProps = JSX.IntrinsicElements["button"]
type PrimaryButtonProps = InputProps & { label: string }


const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
    const { label, ...otherProps } = props
    return (
        <button className="border-2 border-gray-100 bg-cyan-500 rounded-lg text-gray-100 px-16 py-2 justify-center"
            {...otherProps}>
            {label}
        </button>)
}

export default PrimaryButton