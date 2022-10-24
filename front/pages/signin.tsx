import * as React from "react"
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { ApolloError, useMutation } from "@apollo/client"
import { useRouter } from "next/router"

import { NextPageWithLayout } from "./_app"
import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import HyperLink from "../components/HyperLink"
import CheckBoxForm from "../components/inputForm/CheckBocForm"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import ErrorCard from "../components/error/ErrorCard"

import { SIGNIN_USER } from "../graphql/mutation/User.mutation"
import Layout from "../layout/Layout"
import { useSignin_UserMutation } from "../graphql/codegen"


type SignInInput = {
    email: string
    password: string
}
const validateSchema = yup.object().shape({
    email: yup.string().email("メールアドレスの形式が違います").required("必須入力です"),
    password: yup.string().required("必須入力です")
})

const SignIn: NextPageWithLayout = () => {
    const [signIn] = useMutation(
        SIGNIN_USER,
        {
            onCompleted(_) {
                router.push("/top")
            },
            onError(_) {
                setErrorMessage("メールアドレス、またはパスワードが間違っています")
            }
        }
    );
    const [test] = useSignin_UserMutation()
    const { register, handleSubmit, formState: { errors } } = useForm<SignInInput>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const router = useRouter()
    const [errorMessage, setErrorMessage] = React.useState("")

    const onSubmit: SubmitHandler<SignInInput> = async (loginInput) => {
        console.log({loginInput})
        try {
            await test({ variables: { email: loginInput.email, password: loginInput.password } })
            router.push("/top")
        } catch (e) {
            if (e instanceof ApolloError) {
                setErrorMessage("メールアドレス、またはパスワードが間違っています")
            }
        }

    }
    return (
        <div>
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
                            <HyperLink href="/signup">新規登録の方はこちら</HyperLink>
                            <HyperLink href="/forgot">パスワードを忘れた</HyperLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>)
}

SignIn.getLayout = (page) => <Layout>{page}</Layout>
export default SignIn