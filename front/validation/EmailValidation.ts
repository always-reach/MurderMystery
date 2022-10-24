import { LazyQueryExecFunction } from "@apollo/client";
import { Exact, Get_User_By_EmailQuery } from "../graphql/codegen";

export default async function EmailDuplicateValidation(getUser: LazyQueryExecFunction<Get_User_By_EmailQuery, Exact<{ email: string; }>>, email: string | undefined) {
    //メールアドレスのダブりだけを検出
    //存在しなくても、アドレスの形式が不正でもここでは関与しない
    if (email === undefined) {
        return true
    }
    const response = await getUser({ variables: { email } })
    if (response.error) {
        return true
    } else {
        return false
    }
}