import * as React from "react"
import * as yup from 'yup'
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPageWithLayout } from "./_app"

import useAuth from "@hooks/useAuth"
import ErrorCard from "@components/common/cards/errorCard/ErrorCard"
import Password from "@components/common/inputForm/password/Password"
import Text from "@components/common/inputForm/text/Text"
import Button from "@components/common/button/Button"
import CheckBox from "@components/common/inputForm/checkbox/CheckBox"
import HyperLink from "@components/common/hypyerLink/HyperLink"
import Divider from "@components/common/divider/Divider"


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
            router.push("/gamelist")
        } else {
            setErrorMessage("メールアドレス、またはパスワードが間違っています")
        }
    }
    console.log({ signin: auth })
    return (
        <div>
            <div className="h-screen w-screen flex flex-col items-center">
                {errorMessage && <ErrorCard errorMessage={errorMessage} />}
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-10 mb-auto py-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto w-7/12">
                            <Text placeholder="ユーザー名" {...register("username", { required: true })} error={"username" in errors} errorMessage={errors.username?.message} />
                            <Password {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message} />
                            <CheckBox id="checkbox" label="ログイン状態を保持する" />
                            <Button className="mx-auto" type="submit" >ログインする</Button>
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

SignIn.getAccessControl = (isSignIn) => {
    return isSignIn ? { type: "replace", destination: "/top" } : null
}
export default SignIn