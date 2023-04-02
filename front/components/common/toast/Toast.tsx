type ToastProps = {
    color:"primary" | "warning" 
    children: React.ReactNode
}
const Toast: React.FC<ToastProps> = (props) => {
    const color = props.color === "primary" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
    return (
        <div className={`mt-4 p-4 border rounded ${color}`}>
            {props.children}
        </div>
    )
}

export default Toast