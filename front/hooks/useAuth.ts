import * as React from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'
import { Signin_UserMutation, useSignin_UserMutation, useTokenAuthMutation, useVerifyTokenMutation } from '@graphql/codegen'
import { parseCookies } from 'nookies'

const useAuth = () => {
    const isSignInVar = makeVar<Signin_UserMutation|null>({})
    const [userSignIn] = useSignin_UserMutation()
    const [tokenAuth]=useTokenAuthMutation()
    const [tokenVerify]=useVerifyTokenMutation()
    const user=useReactiveVar(isSignInVar)
    const cookies=parseCookies()

    React.useEffect(()=>{
    },[])

    const signIn=async(username:string,password:string):Promise<boolean>=>{
        try{
            const signInResponse = await userSignIn({ variables: { username, password } })
            await tokenAuth({variables:{username,password}})
            isSignInVar(signInResponse.data)
            return true
        }catch(e){
            console.log(e)
            return false
        }
    }





    return {user,signIn}
}

export default useAuth