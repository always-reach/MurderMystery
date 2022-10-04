type InputProps = JSX.IntrinsicElements["a"]

const HyperLink: React.FC<InputProps> = (props) => {
    const { children, ...otherProps } = props
    return (
        <a className="text-cyan-400 hover:text-cyan-600 underline"  {...otherProps}>
            {children}
        </a>
    )
}

export default HyperLink