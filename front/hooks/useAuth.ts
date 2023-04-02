import * as React from 'react'
import { useReactiveVar } from '@apollo/client'
import { useRevokeTokenMutation, useSignin_UserMutation, useTokenAuthMutation, useVerifyTokenMutation } from '@graphql/codegen'
import { client } from '../pages/_app'
import { signInVar, State, userStateVar } from '@state/atom'



const useAuth = () => {
    const state = useReactiveVar(userStateVar)
    const isSignIn = useReactiveVar(signInVar)
    const [userSignIn] = useSignin_UserMutation({ client, fetchPolicy: "no-cache" })
    const [tokenAuth] = useTokenAuthMutation({ client })
    const [tokenVerify] = useVerifyTokenMutation({ client })
    const [revokeToken] = useRevokeTokenMutation({ client })


    React.useEffect(() => {
        verify()
    }, [])

    const signIn = async (email: string, password: string): Promise<boolean> => {
        try {
            await client.resetStore()
            const signInResponse = await userSignIn({ variables: { email, password } })
            const username = signInResponse.data?.signinUser?.user?.username!
            const response = await tokenAuth({ variables: { username, password } })
            if (response.data?.tokenAuth?.token) {
                localStorage.setItem("token", response.data?.tokenAuth?.token)
                localStorage.setItem("refreshToken", response.data?.tokenAuth?.refreshToken)
            }
            userStateVar({ 
                id: signInResponse.data?.signinUser?.user?.id!, 
                username: signInResponse.data?.signinUser?.user?.username!, 
                email: signInResponse.data?.signinUser?.user?.email! })
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

    const updateUserState = (data: State) => {
        userStateVar(data)
    }


    return { state, isSignIn, updateUserState, signIn, signOut, verify }
}

export default useAuth