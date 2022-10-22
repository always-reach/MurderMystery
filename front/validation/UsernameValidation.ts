import { LazyQueryExecFunction } from "@apollo/client";
import { Exact, Get_User_By_UsernameQuery } from "../graphql/codegen";

export default async function UsernameDuplicateValidation(getUser: LazyQueryExecFunction<Get_User_By_UsernameQuery, Exact<{ username: string; }>>, username: string | undefined) {
    //ユーザー名のダブりだけを検出
    //存在しない、長すぎるなどはここでは関与しない
    if (username === undefined) {
        return true
    }
    const response = await getUser({ variables: { username } })
    if (response.error) {
        return true
    } else {
        return false
    }

}