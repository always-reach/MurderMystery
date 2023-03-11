
import * as React from "react"
import { useRouter } from "next/router"
import useAuth from "@hooks/useAuth"
import { HeaderPresenter } from "@components/header/HeaderPresenter"

const Header = () => {
    const auth = useAuth()
    const router = useRouter()
    return <HeaderPresenter isSignin={auth.isSignIn} signout={auth.signOut} router={router.push} />
}

export default Header