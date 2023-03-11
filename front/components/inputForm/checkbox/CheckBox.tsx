type InputProps = JSX.IntrinsicElements["input"]
type CheckBoxProps = InputProps & { label: string }

const CheckBoxForm: React.FC<CheckBoxProps> = (props) => {
    const { label, ...otherProps } = props
    return (
        <div className="flex justify-center items-center mb-4">
            <input type="checkbox"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...otherProps}
            />
            <label htmlFor={otherProps.id}>{label}</label>
        </div>

    )
}

export default CheckBoxForm