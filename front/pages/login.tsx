import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import * as React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import Header from "../components/Header"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import { LOGIN_USER,MutationUser } from "../graphql/mutation/User.mutation"

type LoginInput = {
    email: string
    password: string
}

function Login() {
    const [login, { data, error }] = useMutation<MutationUser>(LOGIN_USER)
    const { register, handleSubmit } = useForm<LoginInput>()
    const router = useRouter()

    const onSubmit: SubmitHandler<LoginInput> = async (loginInput) => {
        console.log(loginInput.email)
        const response=await login({ variables: { email: loginInput.email, password: loginInput.password } })
        if(response.data?.loginUser.user.id){
            router.push("/top")
        }

    }
    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex justify-center">
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-20 mb-auto py-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <EmailForm {...register("email")} />
                        <PasswordForm {...register("password")} />
                        <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                        <PrimaryButton type="submit" label="ログインする" />
                        <Divider />
                        <div className="flex justify-evenly">
                            <HyperLink href="/signon">新規登録の方はこちら</HyperLink>
                            <HyperLink href="/forgot">パスワードを忘れた</HyperLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

export default Login