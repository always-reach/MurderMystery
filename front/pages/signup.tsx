
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

import { NextPageWithLayout } from "./_app"

import UsernameDuplicateValidation from '../validation/UsernameValidation'
import Divider from '@components/common/divider/Divider'
import Password from '@components/common/inputForm/password/Password'
import Button from '@components/common/button/Button'
import TextForm from '@components/common/inputForm/text/TextForm'
import Email from '@components/common/inputForm/email/Email'
import EmailDuplicateValidation from '../validation/EmailValidation'
import { useGet_User_By_EmailLazyQuery, useGet_User_By_UsernameLazyQuery, useSignup_UserMutation } from '@graphql/codegen'



type SignUpInput = {
    username: string
    email: string
    password: string
    rePassword: string
}

const SignUp: NextPageWithLayout = () => {
    const [getUserByUsername] = useGet_User_By_UsernameLazyQuery()
    const [getUserByEmail] = useGet_User_By_EmailLazyQuery()
    const [signUpUser, error] = useSignup_UserMutation()
    const router = useRouter()

    const validateSchema = yup.object().shape({
        username: yup.string().required("必須入力です").max(20, "ユーザー名は最大20文字までです。").test("sameUsername", "既に使用されている名前です。", (inputUsername) => UsernameDuplicateValidation(getUserByUsername, inputUsername)),
        email: yup.string().required("必須入力です").test("sameEmail", "既に使用されているメールアドレスです。", (inputEmail) => EmailDuplicateValidation(getUserByEmail, inputEmail)),
        password: yup.string().required("必須入力です。").min(8, "パスワードは８文字以上です"),
        rePassword: yup.string().required("必須入力です").oneOf([yup.ref("password")], "パスワードが一致しません")
    })

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpInput>({ mode: "onSubmit", reValidateMode: "onSubmit", resolver: yupResolver(validateSchema) })

    const onSubmit: SubmitHandler<SignUpInput> = async (signUpInput) => {
        try {
            const response = await signUpUser({
                variables: {
                    username: signUpInput.username,
                    email: signUpInput.email,
                    password: signUpInput.password
                }
            })
            console.log({ response })
            router.push("/signin")
        } catch (e) {
            console.log({ error })
            console.log(e)
        }


    }


    return (
        <div>
            <p className="mt-8 ml-32 text-4xl">ユーザー登録</p>
            <Divider />
            <div className="my-12 mx-auto w-6/12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextForm placeholder="ユーザー名" {...register("username", { required: true })} error={"username" in errors} errorMessage={errors.username?.message ?? ""} />
                    <Email placeholder="メールアドレス" {...register("email", { required: true })} error={"email" in errors} errorMessage={errors.email?.message ?? ""} />
                    <Password {...register("password", { required: true })} error={"password" in errors} errorMessage={errors.password?.message ?? ""} />
                    <Password placeholder='パスワード(再入力)' {...register("rePassword", { required: true })} error={"rePassword" in errors} errorMessage={errors.rePassword?.message ?? ""} />
                    <Button>登録する</Button>
                </form>
            </div>
        </div>
    )
}

SignUp.getAccessControl = (isSignin: boolean) => {
    return isSignin ? { type: "replace", destination: "/gamelist" } : null
}

export default SignUp


