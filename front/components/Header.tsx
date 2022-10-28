import * as React from "react"
import { isSignInVar } from "../pages/_app"

const Header = () => {
    console.log("rendering header")
    console.log(isSignInVar())

    const signout=()=>{
        isSignInVar({})
        console.log("header signout")
        console.log(isSignInVar())
    }
    return (
        <nav>
            <div className="flex justify-between bg-blue-200 max-w-full mx-auto">
                <div>
                    <h2 className="text-5xl text-gray-900 font-bold p-5">MURDER MYSTERY</h2>
                </div>
                <div className="flex flex-col justify-center p-3">
                    {isSignInVar().signinUser && <h4 className="text-2xl text-gray-900">
                        <button onClick={signout}>SIGNOUT</button>
                        </h4>}
                </div>
            </div>
        </nav>
    )
}

export default Header