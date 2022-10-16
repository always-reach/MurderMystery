import * as React from "react"
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"

import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import Header from "../components/Header"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import ErrorCard from "../components/error/ErrorCard"

import { LOGIN_USER } from "../graphql/mutation/User.mutation"

type LoginInput = {
    email: string
    password: string
}
const validateSchema = yup.object().shape({
    email: yup.string().email("メールアドレスの形式が違います").required("必須入力です"),
    password: yup.string().required("必須入力です").min(8, "パスワードは８文字以上です")
})

function Login() {
    const [login] = useMutation(
        LOGIN_USER,
        {
            onCompleted(_) {
                router.push("/top")
            },
            onError(_) {
                setErrorMessage("メールアドレス、またはパスワードが間違っています")
            }
        }
    );
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState("")

    const onSubmit: SubmitHandler<LoginInput> = async (loginInput) => {
        await login({ variables: { email: loginInput.email, password: loginInput.password } })


    }
    return (
        <div>
            <Header />
            <div className="h-screen w-screen flex flex-col items-center">
                {errorMessage && <ErrorCard errorMessage={errorMessage} />}
                <div className="bg-gray-100 border-2 border-gray-900 rounded-lg w-5/12 mt-10 mb-auto py-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mx-auto w-7/12">
                            <EmailForm {...register("email", { required: true })} error={"email" in errors} errorMessage={errors.email?.message} />
                            <PasswordForm {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message} />
                            <CheckBoxForm id="checkbox" label="ログイン状態を保持する" />
                            <PrimaryButton type="submit" label="ログインする" onClick={() => { console.log(errors) }} />
                        </div>
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