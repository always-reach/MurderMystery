import * as React from "react"
import * as yup from 'yup'
import { useRouter } from "next/router"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPageWithLayout } from "../_app"

import useAuth from "@hooks/useAuth"
import ErrorCard from "@components/common/cards/errorCard/ErrorCard"
import Password from "@components/common/inputForm/password/Password"
import Button from "@components/common/button/Button"
import CheckBox from "@components/common/inputForm/checkbox/CheckBox"
import HyperLink from "@components/common/hypyerLink/HyperLink"
import Divider from "@components/common/divider/Divider"
import Email from "@components/common/inputForm/email/Email"


type SignInInput = {
    email: string
    password: string
}
const validateSchema = yup.object().shape({
    email: yup.string().required("必須入力です"),
    password: yup.string().required("必須入力です")
})

const SignIn: NextPageWithLayout = () => {
    const { register, setValue, handleSubmit, formState: { errors } } = useForm<SignInInput>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const router = useRouter()
    const auth = useAuth()
    const [rememberMe, setRememberMe] = React.useState<boolean>(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    React.useEffect(() => {
        const email = localStorage.getItem("email")
        const password = localStorage.getItem("password")
        const rememberMe = localStorage.getItem("rememberMe")
        if (email) setValue("email", email)
        if (password) setValue("password", password)
        if (rememberMe) setRememberMe(true)

    }, [])

    const onSubmit: SubmitHandler<SignInInput> = async (loginInput) => {
        const isSignIn = await auth.signIn(loginInput.email, loginInput.password)
        if (isSignIn) {
            if (rememberMe) {
                localStorage.setItem("email", loginInput.email)
                localStorage.setItem("password", loginInput.password)
                localStorage.setItem("rememberMe", "rememberMe")
            } else {
                localStorage.removeItem("email")
                localStorage.removeItem("password")
                localStorage.removeItem("rememberMe")
            }

            router.push("/gamelist")
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
                            <Email placeholder="メールアドレス" {...register("email", { required: true })} error={"email" in errors} errorMessage={errors.email?.message ?? ""} />
                            <Password {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message ?? ""} />
                            <CheckBox id="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label="入力を記憶する" />
                            <Button className="mx-auto" type="submit" >ログインする</Button>
                        </div>
                        <Divider />
                        <div className="flex justify-evenly">
                            <HyperLink href="/signup">新規登録の方はこちら</HyperLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

SignIn.getAccessControl = (isSignIn: boolean) => {
    return isSignIn ? { type: "replace", destination: "/gamelist" } : null
}
export default SignIn