import { CircleUserRound, KeyRound, MapPinned, LogOut } from 'lucide-react';

function ProfileSidebar({ activeTab, setActiveTab }) {
    return (
        <>
            <div
                className="bg-white rounded-2xl shadow-sm p-5 min-h-[80vh]
                flex flex-col"
            >
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    font-medium transition duration-300 
                    ${activeTab === 'profile' ? "bg-orange-500 text-white" : "hover:bg-orange-50 hover:text-orange-500"}`}
                    onClick={() => setActiveTab("profile")}
                >
                    <CircleUserRound className="w-5 h-5" />
                    <span>Personal Information</span>
                </div>

                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    font-medium transition duration-300 
                    ${activeTab === 'password' ? "bg-orange-500 text-white" : "hover:bg-orange-50 hover:text-orange-500"}`}
                    onClick={() => setActiveTab("password")}
                >
                    <KeyRound className="w-5 h-5" />
                    <span>Change Password</span>
                </div>

                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    font-medium transition duration-300 
                    ${activeTab === 'address' ? "bg-orange-500 text-white" : "hover:bg-orange-50 hover:text-orange-500"}`}
                    onClick={() => setActiveTab("address")}
                >
                    <MapPinned className="w-5 h-5" />
                    <span>My Addresses</span>
                </div>

                <hr className="border-gray-200 my-4 mt-auto" />

                <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    font-medium transition duration-300
                    hover:bg-red-50 hover:text-red-500">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </div>
            </div>
        </>
    )
}


export default ProfileSidebar