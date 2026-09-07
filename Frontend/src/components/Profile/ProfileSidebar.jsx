import { CircleUserRound, KeyRound, MapPin, Package, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from "react-router-dom"

function ProfileSidebar({ activeTab, setActiveTab }) {
    const { handleLogoutUser, clearUser } = useAuth();
    const { showToast } = useToast();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await handleLogoutUser()
            showToast("Logout successful", "success")
            navigate("/")
            clearUser()
        } catch (error) {
            showToast("Failed to logout", "error")
        }
    }

    return (
        <>
            <aside
                className="
                hidden lg:flex
                h-[calc(100vh-8rem)]
                w-72 shrink-0
                flex-col
                overflow-hidden
                rounded-2xl
                border border-slate-200
                bg-white
                shadow-sm
            "
            >
                {/* Header */}
                <div className="border-b border-slate-100 px-5 py-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                        My Account
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage your account
                    </p>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-3">
                    <div className="space-y-1">
                        <button
                            type='button'
                            className={`group flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-left text-sm font-medium
                            text-slate-600
                            transition-colors
                            ${activeTab === 'profile'
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("profile")}
                        >
                            <span
                                className={`
                                    flex h-9 w-9 shrink-0
                                    items-center justify-center
                                    rounded-lg
                                    bg-slate-50
                                    text-slate-500
                                    transition-colors
                                    group-hover:bg-orange-100
                                    group-hover:text-orange-600
                                `}
                            >
                                <CircleUserRound className="h-4 w-4" />
                            </span>
                            <span>Personal Information</span>
                        </button>

                        <button
                            type='button'
                            className={`group flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-left text-sm font-medium
                            text-slate-600
                            transition-colors 
                            ${activeTab === 'password'
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("password")}
                        >
                            <span
                                className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-slate-50
                            text-slate-500
                            transition-colors
                            group-hover:bg-orange-100
                            group-hover:text-orange-600
                        "
                            >
                                <KeyRound className="h-4 w-4" />
                            </span>
                            <span>Change Password</span>
                        </button>

                        <button
                            type='button'
                            className={`group flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-left text-sm font-medium
                            text-slate-600
                            transition-colors
                            ${activeTab === 'address'
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("address")}
                        >
                            <span
                                className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-slate-50
                            text-slate-500
                            transition-colors
                            group-hover:bg-orange-100
                            group-hover:text-orange-600
                        "
                            >
                                <MapPin className="h-4 w-4" />
                            </span>
                            <span>My Addresses</span>
                        </button>

                        <button
                            type='button'
                            className={`group flex w-full items-center gap-3
                            rounded-xl px-3 py-3
                            text-left text-sm font-medium
                            text-slate-600
                            transition-colors 
                            ${activeTab === 'orders'
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-orange-50 hover:text-orange-500"}`}
                            onClick={() => setActiveTab("orders")}
                        >
                            <span
                                className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-slate-50
                            text-slate-500
                            transition-colors
                            group-hover:bg-orange-100
                            group-hover:text-orange-600
                        "
                            >
                                <Package className="h-4 w-4" />
                            </span>
                            <span>My Orders</span>
                        </button>
                    </div>
                </nav>

                {/* <hr className="border-gray-200 my-4 mt-auto" /> */}

                <div className="border-t border-slate-100 p-3">
                    <button
                        type='button'
                        className="group flex w-full items-center gap-3
                        rounded-xl px-3 py-3
                        text-left text-sm font-medium
                        text-red-500
                        transition-colors
                        hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <span
                            className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-lg
                            bg-red-50
                            text-red-500
                            transition-colors
                            group-hover:bg-red-100
                        "
                        >
                            <LogOut className="h-4 w-4" />
                        </span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    )
}


export default ProfileSidebar