import * as React from 'react'
import { useReactiveVar } from '@apollo/client'
import { Signin_UserMutation, useRevokeTokenMutation, useSignin_UserMutation, useTokenAuthMutation, useVerifyTokenMutation } from '@graphql/codegen'
import { client } from '../pages/_app'
import { signInVar, userStateVar } from '@state/atom'

type State = {
    __typename?: "UserType" | undefined;
    id: string;
    username: string;
    email?: string | null | undefined;
} | null | undefined

export type AuthProps = {
    state: State;
    isSignIn: boolean;
    signIn: (username: string, password: string) => Promise<boolean>;
    signOut: () => Promise<void>;
    verify: () => Promise<void>;
}

const useAuth = () => {
    const state = useReactiveVar(userStateVar)
    const isSignIn = useReactiveVar(signInVar)
    const [userSignIn] = useSignin_UserMutation({ client })
    const [tokenAuth] = useTokenAuthMutation({ client })
    const [tokenVerify] = useVerifyTokenMutation({ client })
    const [revokeToken] = useRevokeTokenMutation({ client })


    React.useEffect(() => {
        verify()
    }, [])

    const getState = (): State => {
        return state?.signinUser?.user
    }

    const signIn = async (username: string, password: string): Promise<boolean> => {
        try {
            const signInResponse = await userSignIn({ variables: { username, password } })
            const response = await tokenAuth({ variables: { username, password } })
            if (response.data?.tokenAuth?.token) {
                localStorage.setItem("token", response.data?.tokenAuth?.token)
                localStorage.setItem("refreshToken", response.data?.tokenAuth?.refreshToken)
            }
            userStateVar(signInResponse.data)
            signInVar(true)
            return true
        } catch (e) {
            console.log(e)
            signInVar(false)
            return false
        }
    }

    const signOut = async () => {
        const refreshToken = localStorage.getItem("refreshToken")
        if (refreshToken) {
            await revokeToken({ variables: { refreshToken } })
            localStorage.removeItem("refreshToken")
        }
        localStorage.removeItem("token")
        signInVar(false)
    }

    const verify = async () => {
        console.log("verify")
        const token = localStorage.getItem("token")
        if (!token) {
            console.log("no token, you can't signin")
            signInVar(false)
            return
        }
        try {
            const response = await tokenVerify({ variables: { token } })
            if (response.data?.verifyToken?.success) {
                console.log(response.data.verifyToken.payload)
                signInVar(true)
                console.log("signin success!!")
            }
        } catch (e) {
            localStorage.removeItem("token")
            localStorage.removeItem("refreshToken")
            console.log("verify error")
            console.log(e)
        }
    }


    return { state: getState(), isSignIn, signIn, signOut, verify }
}

export default useAuth