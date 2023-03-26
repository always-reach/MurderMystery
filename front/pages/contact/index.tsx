import * as React from 'react'
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import Email from "@components/common/inputForm/email/Email";
import TextForm from "@components/common/inputForm/text/TextForm";
import TextareaForm from "@components/common/inputForm/textarea/TextareaForm";
import { NextPageWithLayout } from "../_app";
import { useSend_EmailMutation } from '@graphql/codegen';
import Button from '@components/common/button/Button';
import { useRouter } from 'next/router';

type Contact = {
    email: string
    name: string
    message: string
}

const validateSchema = yup.object().shape({
    email: yup.string().required("必須入力です"),
    name: yup.string().required("必須入力です"),
    message: yup.string().required("必須入力です"),
})

const ContactForm: NextPageWithLayout = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<Contact>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const [sendMail,{loading}] = useSend_EmailMutation()
    const [isSend, setIsSend] = React.useState<boolean>(false)
    const [sendResultMessage, setSendResultMessage] = React.useState<string>("送信に成功しました")

    React.useEffect(() => {
        // /testにアクセスした場合は/signinにリダイレクトする
        router.push('/gamelist');
      }, []);

    const submit: SubmitHandler<Contact> = async (formInput) => {

        sendMail({ variables: formInput })
            .then(response => {
                setSendResultMessage(response.errors ? "送信に失敗しました" : "送信に成功しました")
                setIsSend(true)
            }).catch(error => {
                console.log(error)
                setSendResultMessage("送信に失敗しました")
                setIsSend(true)
            })

    };

    return (
        <div className="flex justify-center my-12">
            <form onSubmit={handleSubmit(submit)} className="w-full max-w-lg">
                <div className="mb-4">

                    <Email
                        id="email"
                        label="メールアドレス"
                        required
                        {...register("email")}
                        error={"email" in errors}
                        errorMessage={errors.email?.message}
                    />
                </div>
                <div className="mb-4">
                    <TextForm
                        id="name"
                        label="名前"
                        required
                        {...register("name")}
                        error={"name" in errors}
                        errorMessage={errors.name?.message}
                    />
                </div>
                <div className="mb-4">
                    <TextareaForm
                        id="message"
                        rows={5}
                        required
                        label='問い合わせ内容'
                        {...register("message")}
                        error={"message" in errors}
                        errorMessage={errors.message?.message}
                    />
                </div>
                <div className="flex justify-center">
                    <Button type="submit" disabled={loading}>
                        送信する
                    </Button>
                </div>
                {isSend && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 border rounded">
                        {sendResultMessage}
                    </div>
                )}
            </form>
        </div>
    );
}

ContactForm.getAccessControl = (isSignIn) => {
    return isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default ContactForm