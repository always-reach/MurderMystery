import { NextPageWithLayout } from "../_app"

const PrivacyPolicy: NextPageWithLayout = () => {
    return (
        <div className="container mx-auto px-4 py-6 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">プライバシーポリシー</h2>
            <p className="mb-4">当Webアプリは、個人が運営するサービスです。お客様から収集した個人情報の適切な管理に努め、お客様のプライバシー保護に最大限の配慮をしています。</p>

            <h3 className="text-lg font-bold mb-2">収集する個人情報の種類</h3>
            <p className="mb-4">当Webアプリは、以下のような個人情報を収集することがあります。</p>
            <ul className="list-disc list-inside mb-4">
                <li>お名前</li>
                <li>メールアドレス</li>
                <li>その他、お問い合わせいただいた内容に関する情報</li>
            </ul>

            <h3 className="text-lg font-bold mb-2">個人情報の利用目的</h3>
            <p className="mb-4">当Webアプリは、収集した個人情報を以下の目的で利用します。</p>
            <ul className="list-disc list-inside mb-4">
                <li>お問い合わせに対する回答</li>
                <li>サービスの提供</li>
                <li>キャンペーン等のお知らせ</li>
                <li>その他、お客様からご同意いただいた目的</li>
            </ul>

            <h3 className="text-lg font-bold mb-2">個人情報の第三者提供</h3>
            <p className="mb-4">当Webアプリは、法律に基づく場合を除き、収集した個人情報を第三者に提供することはありません。</p>

            <h3 className="text-lg font-bold mb-2">個人情報の安全管理措置</h3>
            <p className="mb-4">当Webアプリは、個人情報の漏えい、滅失、毀損等を防止するために、適切な安全管理措置を講じます。</p>
            <h3 className="text-lg font-bold mb-2">利用者の権利に関する説明</h3>
            <p className="mb-4">当Webアプリは、お客様がご自身の個人情報について、アクセス、訂正、削除等の権利を有していることを確認いたします。</p>

            <p className="mt-6">本プライバシーポリシーの変更については、Webアプリ上でお知らせします。</p>

        </div>
    )
}


PrivacyPolicy.getAccessControl = (isSignIn: boolean) => {
    return isSignIn ? { type: "replace", destination: "/gamelist" } : null
}
export default PrivacyPolicy