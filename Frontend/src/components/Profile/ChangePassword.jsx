

function ChangePassword() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Change Password
                </h2>
                <p className="text-gray-600 mb-8">
                    Choose a strong password to keep your account secure
                </p>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="oldPassword"
                            className="text-sm font-medium text-slate-700"
                        >
                            Old Password
                        </label>
                        <input 
                            type="password" id="oldPassword"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none
                                        transition focus:border-orange-500 focus:ring-2 
                                        focus:ring-orange-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="newPassword"
                            className="text-sm font-medium text-slate-700"
                        >
                            New Password
                        </label>
                        <input 
                            type="password" id="newPassword"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none
                                        transition focus:border-orange-500 focus:ring-2 
                                        focus:ring-orange-200"
                        />
                    </div>
                    <button className="self-start bg-orange-500 hover:bg-orange-600 text-white font-bold
                                    px-6 py-3 rounded-xl transition duration-300">
                        Update Password
                    </button>
                </form>
            </div>
        </>
    )
}


export default ChangePassword