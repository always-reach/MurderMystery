import { useQuery } from "@apollo/client"
import * as React from "react"

import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import Header from "../components/Header"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import { GET_USER_BY_EMAIL, Users} from "../graphql/queries/User.query"

function Login() {
    const {data,refetch}=useQuery<Users>(GET_USER_BY_EMAIL,{variables:{email:""}})

    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex justify-center">
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-20 mb-auto py-12">
                    <form>
                    <EmailForm />
                    <PasswordForm />
                    <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                    <PrimaryButton label="ログインする" />
                    <Divider />
                    <div className="flex justify-evenly">
                        <HyperLink href="/top">新規登録の方はこちら</HyperLink>
                        <HyperLink href="/top">パスワードを忘れた</HyperLink>
                    </div>
                    </form>
                </div>
            </div>
        </div>)
}

export default Login