
import * as React from "react"
import { NextPageWithLayout } from "../../_app"
import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import TextForm from "@components/common/inputForm/text/TextForm"
import NumberForm from "@components/common/inputForm/number/NumberForm"
import DateForm from "@components/common/inputForm/date/DateForm"
import FileForm from "@components/common/inputForm/file/FileForm"

const validateSchema = yup.object().shape({
    title: yup.string().required("必須入力です"),
    auther: yup.string(),
    playTimeMinute: yup.number(),
    maxPlayerCount: yup.number(),
    minPlayerCount: yup.number(),
    note: yup.string(),
    image: yup.string(),
    playedAt: yup.date()
})

type GameForm = {
    title: string
    auther: string
    playTimeMinute: number
    maxPlayerCount: number
    minPlayerCount: number
    note: string,
    image: File,
    playedAt: string
}

const GameCreate: NextPageWithLayout = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<GameForm>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })

    const submit: SubmitHandler<GameForm> = async (gameForm) => {
        console.log(gameForm)
    }
    return (
        <div className="w-3/5 mx-auto py-4">
            <form onSubmit={handleSubmit(submit)}>
                <TextForm
                    label="作品名"
                    placeholder="狂気山脈"
                    required
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
                <FileForm
                    label="作品イメージ"
                    {...register("image")}
                    error={"image" in errors}
                    errorMessage={errors.image?.message ?? ""} />
            </form>

        </div>)
}

GameCreate.getAccessControl = (user) => {
    return null
}
export default GameCreate