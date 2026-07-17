import {
    LayoutDashboard,
    Package,
    FolderTree,
    Folders,
    TicketPercent,
    ClipboardList,
    Users,
    LogOut
} from 'lucide-react';

function AdminSidebar() {
    const menuSections = [
        {
            title: "MAIN",
            items: [
                { name: "Dashboard", value: "dashboard", icon: LayoutDashboard }
            ]
        },
        {
            title: "CATALOG",
            items: [
                { name: "Products", value: "products", icon: Package },
                { name: "Categories", value: "categories", icon: FolderTree },
                { name: "Sub Categories", value: "subCategories", icon: Folders }
            ]
        },
        {
            title: "SALES",
            items: [
                { name: "Coupons", value: "coupons", icon: TicketPercent },
                { name: "Orders", value: "orders", icon: ClipboardList }
            ]
        },
        {
            title: "ACCOUNT",
            items: [
                { name: "Users", value: "users", icon: Users }
            ]
        }
    ];

    return (
        <>
            <div className="w-72 bg-slate-900 text-white min-h-screen flex flex-col">

                {/* Logo */}
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-2xl font-bold">
                        ShopEase Admin
                    </h2>
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 overflow-y-auto">

                    {
                        menuSections.map(({ title, items }) => (
                            <div key={title} className="mb-8">

                                <p className="text-xs font-semibold text-slate-400 uppercase 
                                                tracking-widest mb-3">
                                    {title}
                                </p>

                                <div className="space-y-2">

                                    {
                                        items.map(({ name, value, icon: Icon }) => (
                                            <div
                                                key={value}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl
                                               cursor-pointer font-medium transition-all duration-300
                                               hover:bg-orange-600 hover:text-white"
                                            >
                                                <Icon className="w-5 h-5 flex-shrink-0" />

                                                <span className="text-sm">
                                                    {name}
                                                </span>
                                            </div>
                                        ))
                                    }

                                </div>

                            </div>
                        ))
                    }

                </div>

                {/* Logout */}
                <div className="border-t border-slate-700 p-4">
                    <button
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                       font-medium transition-all duration-300
                       hover:bg-red-500 hover:text-white"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>

            </div>
        </>
    )
}


export default AdminSidebar