import { makeVar } from "@apollo/client"
import { Signin_UserMutation } from "@graphql/codegen"

export type State = {
    id: string;
    username: string;
    email: string;
}

export const signInVar = makeVar<boolean>(false)
export const userStateVar = makeVar<State>({id:"",username:"",email:""})