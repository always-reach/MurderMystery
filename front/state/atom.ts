import { makeVar } from "@apollo/client"
import { Signin_UserMutation } from "@graphql/codegen"

export const signInVar = makeVar<boolean>(false)
export const userStateVar = makeVar<Signin_UserMutation | null>(null)