import * as React from 'react'
import { useRouter } from "next/router";
import useAuth from '@hooks/useAuth';


type AccessControlType = "replace" | "push" 
type AccessContorolFallback = { type: AccessControlType, destination: string }
export type GetAccessControl = (isSignIn: boolean) => null | AccessContorolFallback | Promise<null | AccessContorolFallback>

export const accessControl = () => {
  throw new Error('getAccessControl が定義されていません。');
};

export const useAccessControl = (getAccessControle: GetAccessControl) => {
  const router = useRouter()
  const auth = useAuth()
  React.useEffect(() => {
    const control = async () => {
      const accessControle = await getAccessControle(auth.isSignIn)
      if (accessControle == null) {
        return
      }
      router[accessControle.type](accessControle.destination)
    }
    control()
  }, [router, auth.state])
}