import * as React from "react"
import * as yup from 'yup'
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPageWithLayout } from "./_app"
import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import ErrorCard from "../components/error/ErrorCard"

import Layout from "../layout/Layout"
import TextForm from "../components/inputForm/TextForm"
import useAuth from "@hooks/useAuth"


type SignInInput = {
    username: string
    password: string
}
const validateSchema = yup.object().shape({
    username: yup.string().required("必須入力です"),
    password: yup.string().required("必須入力です")
})

const SignIn: NextPageWithLayout = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInInput>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const router = useRouter()
    const auth = useAuth()
    const [errorMessage, setErrorMessage] = React.useState("")

    const onSubmit: SubmitHandler<SignInInput> = async (loginInput) => {
        const isSignIn = await auth.signIn(loginInput.username, loginInput.password)
        if (isSignIn) {
            router.push("/top")
        } else {
            setErrorMessage("メールアドレス、またはパスワードが間違っています")
        }
    }

    return (
        <div>
            <div className="h-screen w-screen flex flex-col items-center">
                {errorMessage && <ErrorCard errorMessage={errorMessage} />}
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-10 mb-auto py-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto w-7/12">
                            <TextForm placeholder="ユーザー名" {...register("username", { required: true })} error={"username" in errors} errorMessage={errors.username?.message} />
                            <PasswordForm {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message} />
                            <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                            <PrimaryButton type="submit" label="ログインする" />
                        </div>
                        <Divider />
                        <div className="flex justify-evenly">
                            <HyperLink href="/signup">新規登録の方はこちら</HyperLink>
                            <HyperLink href="/forgot">パスワードを忘れた</HyperLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

SignIn.getLayout = (page) => <Layout>{page}</Layout>
SignIn.getAccessControl = (user) => {
    return user.signinUser ? { type: "replace", destination: "/top" } : null
}
export default SignIn