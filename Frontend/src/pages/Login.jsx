import Logo from "../components/Header/Logo"

function LoginForm() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6
                            flex-col gap-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <div>
                        <div className="flex justify-center">
                            <Logo theme={'text-slate-900 font-bold text-2xl'}/>
                        </div>
                        <p className="text-gray-600 text-center mt-2 mb-8">
                            Login to continue shopping
                        </p>
                    </div>
                    <div>
                        <form className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email"
                                       className="text-sm font-medium text-gray-700" 
                                >
                                    Email
                                </label>
                                <input type="text" id="email" 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password"
                                       className="text-sm font-medium text-gray-700" 
                                >
                                    Password
                                </label>
                                <input type="password" id="password" 
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white  font-semibold
                                            py-3 rounded-xl transition duration-300">
                                Login
                            </button>
                        </form>
                    </div>

                    <div>
                        <p className="text-sm text-center text-gray-600 mt-6">
                            Don't have an account? 
                            <span className="text-orange-500 font-medium hover:underline">
                                &nbsp;Create Account
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default LoginForm