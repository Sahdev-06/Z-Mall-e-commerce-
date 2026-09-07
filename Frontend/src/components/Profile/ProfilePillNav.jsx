import {
    UserRound,
    LockKeyhole,
    MapPin,
    ShoppingBag,
} from "lucide-react"

const navItems = [
    {
        id: "profile",
        label: "Personal Information",
        icon: UserRound,
    },
    {
        id: "password",
        label: "Change Password",
        icon: LockKeyhole,
    },
    {
        id: "address",
        label: "My Addresses",
        icon: MapPin,
    },
    {
        id: "orders",
        label: "My Orders",
        icon: ShoppingBag,
    },
]

function ProfilePillNav({ activeTab, setActiveTab }) {
    return (
        <div className="hidden w-full justify-center px-4 py-4 md:flex lg:hidden">
            <nav className="flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">

                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                flex shrink-0 items-center gap-2
                                rounded-full px-4 py-2.5
                                text-sm font-medium
                                transition-all duration-200
                                ${
                                    isActive
                                        ? "bg-[#0B1F3A] text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]"
                                }
                            `}
                        >
                            <Icon
                                size={17}
                                strokeWidth={1.8}
                            />

                            <span>{item.label}</span>
                        </button>
                    )
                })}

            </nav>
        </div>
    )
}

export default ProfilePillNav
