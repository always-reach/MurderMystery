import Link from "next/link";

type HeaderProps = {
    isSignin: boolean
    signout: () => Promise<void>
    router: (url: string) => void
}
export const HeaderPresenter: React.FC<HeaderProps> = (props) => {
    const signout = async () => {
        await props.signout()
        props.router("/signin")
    }
    return (
        <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    <Link href="/gamelist" >
                        <a>
                            Murder Mystery
                        </a>
                    </Link>

                </span>
            </div>
            {props.isSignin &&
                <div className="grow flex items-center w-auto">
                    <div className="text-sm grow">
                        <Link href="/gamelist" >
                            <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                                トップ
                            </a>
                        </Link>
                        <Link href="/profile">
                            <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                                プロフィール
                            </a>
                        </Link>
                        <Link href="/privacyPolicy" >
                            <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                                プライバシーポリシー
                            </a>
                        </Link>
                        <Link href="/contact" >
                            <a className="inline-block mt-0 text-teal-200 hover:text-white mr-4">
                                お問合せ
                            </a>
                        </Link>

                    </div>

                    <div>
                        <a href="#" onClick={signout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-0">SignOut</a>
                    </div>

                </div>
            }
        </nav>
    )
}