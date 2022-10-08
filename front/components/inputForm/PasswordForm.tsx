const PasswordForm = () => {
    return (
        <div className="w-full mb-6">
            <input type="password" 
                id="password" 
                className="mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="パスワード" 
                required />
        </div>

    )
}

export default PasswordForm