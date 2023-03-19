
import * as React from "react"
import { NextPageWithLayout } from "../../_app"
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from "@components/common/inputForm/text/TextForm"
import NumberForm from "@components/common/inputForm/number/NumberForm"
import DateForm from "@components/common/inputForm/date/DateForm"
import FileForm from "@components/common/inputForm/file/FileForm"
import Button from "@components/common/button/Button"
import useAuth from "@hooks/useAuth"
import { CreateGameMutationInput, useCreateGameMutation } from "@graphql/codegen"
import { isValidDate } from "@utils/dateUtil"
import { useRouter } from "next/router"

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const FILE_SIZE = 1000000;

const validateSchema = yup.object().shape({
    title: yup.string().required("必須入力です"),
    auther: yup.string(),
    playTimeMinute: yup.number().nullable().transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
    ),
    maxPlayerCount: yup.number().nullable().transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
    ),
    minPlayerCount: yup.number().nullable().transform((value, originalValue) =>
        String(originalValue).trim() === '' ? null : value
    ),
    note: yup.string(),
    playedAt: yup.string().required("必須入力です")
        .test(
            "isValidDate", 
            "不正な日付です",
             (value: string | undefined) => {
                if(value){
                    return (isValidDate(value))
                }
                return true
            })
})

type GameForm = {
    title: string
    auther: string
    playTimeMinute: number
    maxPlayerCount: number
    minPlayerCount: number
    note: string,
    playedAt: string
}

const GameCreate: NextPageWithLayout = () => {
    const auth = useAuth()
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<GameForm>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
    const [createGame] = useCreateGameMutation()

    const submit: SubmitHandler<GameForm> = async (gameForm) => {
        try {
            const input: CreateGameMutationInput = {
                title: gameForm.title,
                auther: gameForm.auther,
                playTimeMinute: gameForm.playTimeMinute,
                maxPlayerCount: gameForm.maxPlayerCount,
                minPlayerCount: gameForm.minPlayerCount,
                note: gameForm.note,
                playedAt: gameForm.playedAt,
                user: auth.state?.id
            }
            await createGame({variables: { input }})
            router.push("/gamelist")

        } catch (e) {
            console.log({ e })
        }
    }
    return (
        <div className="w-3/5 mx-auto py-4">
            <form onSubmit={handleSubmit(submit)}>
                <TextForm
                    label="作品名"
                    placeholder="狂気山脈"
                    {...register("title")}
                    error={"title" in errors}
                    errorMessage={errors.title?.message ?? ""} />
                <TextForm
                    label="作者"
                    placeholder="ダバ & まだら牛"
                    {...register("auther")}
                    error={"auther" in errors}
                    errorMessage={errors.auther?.message ?? ""} />
                <NumberForm
                    label="プレイ時間(分)"
                    placeholder="270"
                    {...register("playTimeMinute")}
                    error={"playTimeMinute" in errors}
                    errorMessage={errors.playTimeMinute?.message ?? ""} />
                <NumberForm
                    label="最大参加人数"
                    placeholder="6"
                    {...register("maxPlayerCount")}
                    error={"maxPlayerCount" in errors}
                    errorMessage={errors.maxPlayerCount?.message ?? ""} />
                <NumberForm
                    label="最小参加人数"
                    placeholder="6"
                    {...register("minPlayerCount")}
                    error={"minPlayerCount" in errors}
                    errorMessage={errors.minPlayerCount?.message ?? ""} />
                <DateForm
                    label="プレイした日"
                    {...register("playedAt")}
                    error={"playedAt" in errors}
                    errorMessage={errors.playedAt?.message ?? ""} />
                <Button >登録する</Button>
            </form>

        </div>)
}

GameCreate.getAccessControl = (isSignIn) => {
    return !isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default GameCreate

