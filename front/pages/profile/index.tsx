import * as React from 'react'
import * as yup from 'yup'
import { NextPageWithLayout } from "../_app"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from "@components/common/inputForm/text/TextForm"
import Password from "@components/common/inputForm/password/Password"
import Email from "@components/common/inputForm/email/Email"
import Button from "@components/common/button/Button"
import useAuth from "@hooks/useAuth"
import UsernameDuplicateValidation from '@validation/UsernameValidation'
import EmailDuplicateValidation from '@validation/EmailValidation'
import { useUpdate_UserMutation, useGet_User_By_EmailLazyQuery, useGet_User_By_UsernameLazyQuery } from '@graphql/codegen'
import Toast from '@components/common/toast/Toast'

type ProfileForm = {
    username: string
    email: string
    password: string
    rePassword: string

}
type ToastType={
    "message":string,
    "type":"primary"|"warning"
}

const Profile: NextPageWithLayout = () => {
    const validateSchema = yup.object().shape({
        username: yup.string().required("必須入力です").max(20, "ユーザー名は最大20文字までです。").test("sameUsername", "既に使用されている名前です。", (inputUsername) => UsernameDuplicateValidation(getUserByUsername, inputUsername, auth.state?.username)),
        email: yup.string().required("必須入力です").test("sameEmail", "既に使用されているメールアドレスです。", (inputEmail) => EmailDuplicateValidation(getUserByEmail, inputEmail, auth.state?.email)),
        password: yup.string().nullable().test("hasPassword", "パスワードは８文字以上です", (password) => !password || password?.length >= 8),
        rePassword: yup.string().nullable().oneOf([yup.ref("password")], "パスワードが一致しません")
    })


    const auth = useAuth()
    const [getUserByUsername] = useGet_User_By_UsernameLazyQuery()
    const [getUserByEmail] = useGet_User_By_EmailLazyQuery()
    const [updateUser] = useUpdate_UserMutation()
    const [toast, setToast] = React.useState<ToastType>({ message: "更新に成功しました", type: "primary" })
    const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
        mode: "onSubmit",
        resolver: yupResolver(validateSchema),
        defaultValues: {
            username: auth.state?.username ?? "",
            email: auth.state?.email ?? ""
        }
    })

    const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
        const inputData: Partial<ProfileForm> = { ...data }

        delete inputData.rePassword
        try {
            const response = await updateUser({ variables: { ...inputData, id: auth.state.id } })
            if(response.errors){
                setIsSuccess(false)
                setToast({ message: "更新に失敗しました", type: "warning" })
                return
            }
            setIsSuccess(true)
            setToast({ message: "更新に成功しました", type: "primary" })
            auth.updateUserState({ ...auth.state, ...inputData })
        } catch (e) {
            setIsSuccess(false)
            setToast({ message: "更新に失敗しました", type: "warning" })
            console.log(e)
        }
    }

    return (


        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:w-2/3 sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-lightBlue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-gray-900">ユーザー設定</h1>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div>
                                <div className="space-y-1">
                                    <TextForm label="ユーザー名" placeholder="ユーザー名" {...register('username')} error={"username" in errors} errorMessage={errors.username?.message ?? ""} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-1">
                                    <Email label="メールアドレス" placeholder="メールアドレス" {...register('email', { required: true })} error={"email" in errors} errorMessage={errors.email?.message ?? ""} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-1">
                                    <Password label="パスワード" {...register('password')} error={"password" in errors} errorMessage={errors.password?.message ?? ""} />
                                </div>
                            </div>
                            <div>
                                <div className="space-y-1">
                                    <Password label="パスワード(確認用)" placeholder="パスワード(確認用)" {...register('rePassword')} error={"rePassword" in errors} errorMessage={errors.rePassword?.message ?? ""} />
                                </div>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="mx-auto">
                                    更新
                                </Button>
                            </div>
                            {isSuccess && <Toast color={toast.type}>{toast.message}</Toast>}
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

Profile.getAccessControl = (isSignIn: boolean) => {
    return isSignIn ? null : { type: "replace", destination: "/signin" }
}
export default Profile