import * as React from 'react'
import { useReactiveVar } from "@apollo/client";
import { useRouter } from "next/router";
import { Signin_UserMutation } from '../graphql/codegen';
import { isSignInVar } from '../pages/_app';

type AccessControlType = "replace" | "push"
type AccessContorolFallback = { type: AccessControlType, destination: string }
export type GetAccessControl = (user: Signin_UserMutation) => null | AccessContorolFallback | Promise<null | AccessContorolFallback>

export const accessControl = () => {
    throw new Error('getAccessControl が定義されていません。');
  };

export const useAccessControl = (getAccessControle: GetAccessControl) => {
    const router = useRouter()
    const isSignIn = useReactiveVar(isSignInVar)
    React.useEffect(() => {
      const control = async () => {
        const accessControle = await getAccessControle(isSignIn)
        if (accessControle == null) {
          return
        }
        router[accessControle.type](accessControle.destination)
      }
      control()
    }, [router, isSignIn])
  }