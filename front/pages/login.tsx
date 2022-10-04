import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import Header from "../components/Header"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"

function Login() {
    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex justify-center">
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-20 mb-auto py-12">
                    <EmailForm />
                    <PasswordForm />
                    <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                    <PrimaryButton label="ログインする" />
                    <Divider />
                    <div className="flex justify-evenly">
                        <HyperLink href="/top">新規登録の方はこちら</HyperLink>
                        <HyperLink href="/top">パスワードを忘れた</HyperLink>
                    </div>

                </div>
            </div>
        </div>)
}

export default Login