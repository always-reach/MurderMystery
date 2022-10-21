
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useLazyQuery } from '@apollo/client'

import PrimaryButton from "../components/button/primaryButton"
import Divider from "../components/Divider"
import EmailForm from "../components/inputForm/EmailForm"
import PasswordForm from "../components/inputForm/PasswordForm"
import TextForm from "../components/inputForm/TextForm"
import Layout from "../layout/Layout"
import { NextPageWithLayout } from "./_app"

import { GET_USER_BY_EMAIL } from '../graphql/queries/User.query'
import { EmailDuplicateValidation } from '../validation/EmailValidation'

type SignUpInput = {
    username: string
    email: string
    password: string
    rePassword: string
}

const SignUp: NextPageWithLayout = () => {
    const [getUser, { data }] = useLazyQuery(GET_USER_BY_EMAIL)

    const validateSchema = yup.object().shape({
        username: yup.string().required("必須入力です").max(20, "ユーザー名は最大20文字までです。").test("sameUsername", "既に使用されている名前です。", (inputUsername) => { return true }),
        email: yup.string().email("メールアドレスの形式が違います").required("必須入力です").test("sameAddress", "既に登録されているメールアドレスです。", (inputEmail) => EmailDuplicateValidation(getUser,inputEmail)),
        password: yup.string().required("必須入力です。").min(8, "パスワードは８文字以上です"),
        rePassword: yup.string().required("必須入力です").oneOf([yup.ref("password")], "パスワードが一致しません")
    })

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignUpInput>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })

    const onSubmit: SubmitHandler<SignUpInput> = (signUpInput) => {
        console.log({ signUpInput })
    }



    return (
        <div>
            <p className="mt-8 ml-32 text-4xl">ユーザー登録</p>
            <Divider />
            <div className="my-12 mx-auto w-6/12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextForm placeholder="ユーザー名" {...register("username", { required: true })} error={"username" in errors} errorMessage={errors.username?.message} />
                    <EmailForm {...register("email", { required: true })} error={"email" in errors} errorMessage={errors.email?.message} />
                    <PasswordForm {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message} />
                    <PasswordForm {...register("rePassword", { required: true })} error={"rePassword" in errors} errorMessage={errors.rePassword?.message} />
                    <PrimaryButton label="登録する" />
                </form>
            </div>
        </div>
    )
}

SignUp.getLayout = (page) => <Layout>{page}</Layout>

export default SignUp