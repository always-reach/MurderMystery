import { Header } from "../components/Header"
import { EmailField } from "../components/TextForm"

function Login() {
    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex justify-center items-cente">
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-7/12 my-auto mx-32 p-12">
                <EmailField />
                </div>
            </div>
        </div>)
}

export default Login