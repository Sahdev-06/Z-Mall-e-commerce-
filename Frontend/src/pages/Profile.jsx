import Breadcrumb from "../components/Common/Breadcrumb"
import ProfileSidebar from "../components/Profile/ProfileSidebar"
import ProfilePillNav from "../components/Profile/ProfilePillNav"
import { LockKeyhole, MapPin, ChevronRight } from "lucide-react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

function Profile() {
    const location = useLocation()
    const navigate = useNavigate()

    const getActiveTab = () => {
        if (location.pathname === "/profile/password") {
            return "password"
        }

        if (location.pathname === "/profile/addresses") {
            return "address"
        }

        if (location.pathname === "/profile/orders") {
            return "orders"
        }

        return "profile"
    }

    const activeTab = getActiveTab()

    const handleTabChange = (tab) => {
        const routes = {
            profile: "/profile",
            password: "/profile/password",
            address: "/profile/addresses",
            orders: "/profile/orders",
        }

        navigate(routes[tab])
    }

    const isProfileHome = location.pathname === "/profile"

    return (
        <main className="min-h-screen bg-slate-50">

            <Breadcrumb />

            {/* Tablet Navigation: 768px - 1023px */}
            <ProfilePillNav
                activeTab={activeTab}
                setActiveTab={handleTabChange}
            />

            <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">

                {/* Desktop Sidebar: 1024px+ */}
                <div className="hidden lg:block">
                    <ProfileSidebar
                        activeTab={activeTab}
                        setActiveTab={handleTabChange}
                    />
                </div>

                {/* Profile Content */}
                <div className="min-w-0 flex-1">

                    <Outlet />

                    {/* Mobile Profile Navigation */}
                    {isProfileHome && (
                        <div className="mt-6 md:hidden">

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                                {/* Change Password */}
                                <button
                                    type="button"
                                    onClick={() => navigate("/profile/password")}
                                    className="
                                        group flex w-full items-center gap-4
                                        px-4 py-4 text-left
                                        transition-colors
                                        hover:bg-orange-50
                                    "
                                >
                                    <span
                                        className="
                                            flex h-10 w-10 shrink-0
                                            items-center justify-center
                                            rounded-xl
                                            bg-slate-50
                                            text-slate-600
                                            transition-colors
                                            group-hover:bg-orange-100
                                            group-hover:text-orange-500
                                        "
                                    >
                                        <LockKeyhole className="h-5 w-5" />
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-medium text-slate-900">
                                            Change Password
                                        </span>

                                        <span className="mt-0.5 block text-xs text-slate-500">
                                            Update your account password
                                        </span>
                                    </span>

                                    <ChevronRight
                                        className="
                                            h-5 w-5 shrink-0
                                            text-slate-400
                                            transition-transform
                                            group-hover:translate-x-0.5
                                            group-hover:text-orange-500
                                        "
                                    />
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </div>
        </main>
    )
}

export default Profile
