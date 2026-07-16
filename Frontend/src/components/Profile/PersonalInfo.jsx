

function PersonalInfo() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    Personal Information
                </h2>
                <form className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700"
                        >
                            Full Name
                        </label>
                        <input 
                            type="text" id="name" value="Sahdev Kumar"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none
                                        transition focus:border-orange-500 focus:ring-2 
                                        focus:ring-orange-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700"
                        >
                            Email
                        </label>
                        <input 
                            type="email" id="email" value="sample@gmail.com"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none
                                        transition focus:border-orange-500 focus:ring-2 
                                        focus:ring-orange-200"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label 
                            htmlFor="phone"
                            className="text-sm font-medium text-slate-700"
                        >
                            Phone
                        </label>
                        <input 
                            type="tel" id="phone" value="1234567890"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none
                                        transition focus:border-orange-500 focus:ring-2 
                                        focus:ring-orange-200"
                        />
                    </div>
                    <button className="self-start bg-orange-500 hover:bg-orange-600 text-white font-bold
                                    px-6 py-3 rounded-xl transition duration-300">
                        Save Changes
                    </button>
                </form>
            </div>
        </>
    )
}


export default PersonalInfo