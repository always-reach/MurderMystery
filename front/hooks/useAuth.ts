import * as React from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'
import { Signin_UserMutation, useRevokeTokenMutation, useSignin_UserMutation, useTokenAuthMutation, useVerifyTokenMutation } from '@graphql/codegen'
import { client } from '../pages/_app'

const useAuth = () => {
    const userStateVar = makeVar<Signin_UserMutation | null>({})
    const state = useReactiveVar(userStateVar)
    const signInVar = makeVar<boolean>(false)
    const isSignIn = useReactiveVar(signInVar)
    const [userSignIn] = useSignin_UserMutation({ client })
    const [tokenAuth] = useTokenAuthMutation({ client })
    const [tokenVerify] = useVerifyTokenMutation({ client })
    const [revokeToken] = useRevokeTokenMutation({ client })


    React.useEffect(() => {
        verify()
    }, [])

    const signIn = async (username: string, password: string): Promise<boolean> => {
        try {
            const signInResponse = await userSignIn({ variables: { username, password } })
            const response = await tokenAuth({ variables: { username, password } })
            if (response.data?.tokenAuth?.token) {
                localStorage.setItem("token", response.data?.tokenAuth?.token)
            }
            userStateVar(signInResponse.data)
            return true
        } catch (e) {
            console.log(e)
            signInVar(false)
            return false
        }
    }

    const signOut = async () => {
        await revokeToken()
        localStorage.removeItem("token")
        signInVar(false)
    }

    const verify = async () => {
        console.log("verify")
        const token=localStorage.getItem("token")
        if (!token){
            signInVar(false)
            return 
        }
        try {
            const response = await tokenVerify({ variables: { token } })
            if (response.data?.verifyToken?.success) {
                console.log(response.data.verifyToken.payload)
                signInVar(true)
            }
        } catch (e) {
            console.log(e)
        }
    }


    return { state, isSignIn, signIn, signOut, verify }
}

export default useAuth