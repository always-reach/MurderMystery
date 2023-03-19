import * as React from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { NextPageWithLayout } from "../_app"
import useAuth from '@hooks/useAuth'
import TextForm from "@components/common/inputForm/text/TextForm"
import NumberForm from "@components/common/inputForm/number/NumberForm"
import DateForm from "@components/common/inputForm/date/DateForm"
import Button from "@components/common/button/Button"
import { UpdateGameMutationInput, useGet_Game_Mast_By_IdQuery, useUpdateGameMutation } from '@graphql/codegen'
import { SubmitHandler, useForm } from 'react-hook-form'
import { isValidDate } from '@utils/dateUtil'
import TextareaForm from '@components/common/inputForm/textarea/TextareaForm'
import Snackbar from '@components/common/snackbar/Snackbar'

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
        if (value) {
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
  playedAt: string
  note: string
}

const Game: NextPageWithLayout = () => {
  const auth = useAuth()
  const router = useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<GameForm>({ mode: "onSubmit", resolver: yupResolver(validateSchema) })
  const { loading, data } = useGet_Game_Mast_By_IdQuery({
    variables: {
      Id: Number(router.query.id)
    }
  })
  const [updateGame] = useUpdateGameMutation()
  const [isSnackbarShow,setIsSnackbarShow]=React.useState<boolean>(false)
  const [snackbarMessage,setSnackbarMessage]=React.useState<string>("")

  React.useEffect(() => {
    if (loading) return
    if (!data) return
    const game = data.gameById
    if (!game) return
    setValue("title", game.title)
    if (game.auther) setValue("auther", game.auther)
    if (game.playTimeMinute) setValue("playTimeMinute", game.playTimeMinute)
    if (game.maxPlayerCount) setValue("maxPlayerCount", game.maxPlayerCount)
    if (game.minPlayerCount) setValue("minPlayerCount", game.minPlayerCount)
    if (game.playedAt) setValue("playedAt", game.playedAt)
    if (game.note) setValue("note", game.note)
  }, [data])

  const submit: SubmitHandler<GameForm> = async (gameForm) => {
    try {
      const input: UpdateGameMutationInput = {
        id: Number(router.query.id),
        title: gameForm.title,
        auther: gameForm.auther,
        playTimeMinute: gameForm.playTimeMinute,
        maxPlayerCount: gameForm.maxPlayerCount,
        minPlayerCount: gameForm.minPlayerCount,
        note: gameForm.note,
        playedAt: gameForm.playedAt,
        user: auth.state?.id
      }
      const response=await updateGame({ variables: { input } })
      console.log(response)
      setSnackbarMessage("更新に成功しました")
    } catch (e) {
      console.log({ e })
      setSnackbarMessage("更新に失敗しました。もう一度試してください")
    }
    setIsSnackbarShow(true)
  }

  if (loading) return <div>loading</div>
  console.log(data)
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
        <TextareaForm
          label="備考"
          {...register("note")}
          error={"note" in errors}
          errorMessage={errors.note?.message ?? ""}
        />
        <Button className='my-4'>更新する</Button>
      </form>
      <Snackbar isShow={isSnackbarShow} message={snackbarMessage}/>
    </div>
  );
}

/**
 * サーバーサイドの処理として動くため引数に常にfalseが入ってしまう?
 * @param isSignIn 
 * @returns 
 */
Game.getAccessControl = (isSignIn) => {
  if (typeof window !== "undefined") {//サーバーサイド
    const token = localStorage.getItem("token")
    return !token ? { type: "replace", destination: "/signin" } : null
  }
  console.log({ GameList: isSignIn })
  return !isSignIn ? { type: "replace", destination: "/signin" } : null
}
export default Game
