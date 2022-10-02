import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import Header from "../components/Header"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"

function Login() {
    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex justify-center">
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 my-auto py-12">
                    <EmailForm />
                    <PasswordForm />
                    <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                    <Divider />
                    <PrimaryButton label="ログインする"/>
                </div>
            </div>
        </div>)
}

export default Login