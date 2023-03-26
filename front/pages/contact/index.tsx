import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import Email from "@components/common/inputForm/email/Email";
import TextForm from "@components/common/inputForm/text/TextForm";
import TextareaForm from "@components/common/inputForm/textarea/TextareaForm";
import { NextPageWithLayout } from "../_app";

type Contact = {
    email: string
    name: string
    message: string
}

const validateSchema = yup.object().shape({
    email: yup.string().required("必須入力です"),
    name: yup.string(),
    message: yup.string().required("必須入力です"),
})

const ContactForm: NextPageWithLayout = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Contact>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })

    const submit = async (e: any) => {
        console.log(e)
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
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${true ? 'opacity-50 cursor-wait' : ''
                            }`}
                    >
                        送信する
                    </button>
                </div>
                {true && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 border rounded">
                        メール送信成功時のメッセージ
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