import { useReactiveVar } from "@apollo/client"
import * as React from "react"
import { isSignInVar } from "../pages/_app"

const Header = () => {
    const isSignIn = useReactiveVar(isSignInVar)
    const signout = () => {
        //isSignInVar({})
        console.log(isSignInVar)
    }
    console.log(isSignIn)
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Murder Mystery</span>
            </div>
            <div className="grow flex items-center w-auto">
                <div className="text-sm grow">
                    <a href="/top" className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                        トップ
                    </a>
                    <a href="/setting" className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                        設定
                    </a>
                </div>
                {isSignIn.signinUser &&
                    <div>
                        <a href="#" onClick={signout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-0">SignOut</a>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Header