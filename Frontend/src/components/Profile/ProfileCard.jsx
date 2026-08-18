import { Heart, ShoppingCart, CircleUserRound, X, LogOut, Package } from "lucide-react";
import { logoutUser } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext.jsx";
import { useEffect } from "react";


// function ProfileCard({ isProfileOpen, setIsProfileOpen }) {
//     const { user, handleLogoutUser, clearUser } = useAuth();
//     const { showToast } = useToast();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         setIsProfileOpen(false)
//     }, [location])

//     const handleLogout = async () => {
//         try {
//             await handleLogoutUser()
//             showToast("Logout successful", "success")
//             navigate("/")
//             clearUser()
//         } catch (error) {
//             showToast("Failed to logout", "error")
//         }
//     }

//     return (
//         <>
//             {/* Overlay */}
//             <div
//                 className={`fixed inset-0 ${isProfileOpen ? "block" : "hidden"}`}
//                 onClick={() => setIsProfileOpen(false)}
//             />

//             <div
//                 className={`w-72 bg-white border border-gray-200 fixed top-15 right-4
//                             flex flex-col z-50 rounded-lg shadow-sm
//                             ${isProfileOpen ? "block" : "hidden"}
//                             `}
//             >
//                 {
//                     user && (
//                         <div>
//                             <div className="flex items-center justify-between border-b border-gray-200 p-4">
//                                 {/* Header */}
//                                 <div>
//                                     <p className="text-gray-500 text-sm">
//                                         Welcome
//                                     </p>
//                                     <h2 className="text-slate-900 font-semibold">
//                                         { user.fullName }
//                                     </h2>
//                                 </div>

//                                 <button
//                                     className="rounded-lg p-2 hover:bg-gray-100"
//                                     onClick={() => setIsProfileOpen(false)}
//                                 >
//                                     <X className="w-5 h-5" />
//                                 </button>
//                             </div>

//                             {/* Menu */}
//                             <div className="px-3 py-4">
//                                 <Link
//                                     to="/profile"
//                                     className="flex items-center gap-3 w-full rounded-lg p-3 text-left
//                                     hover:bg-orange-100 hover:text-orange-500"
//                                 >
//                                     <CircleUserRound className="w-5 h-5" />
//                                     <span>
//                                         Profile
//                                     </span>
//                                 </Link>

//                                 <Link
//                                     className="flex items-center gap-3 w-full rounded-lg p-3 text-left
//                                     hover:bg-orange-100 hover:text-orange-500"
//                                 >
//                                     <Heart className="w-5 h-5" />
//                                     <span>
//                                         Wishlist
//                                     </span>
//                                 </Link>

//                                 <Link
//                                     to="/cart"
//                                     className="flex items-center gap-3 w-full rounded-lg p-3 text-left
//                                     hover:bg-orange-100 hover:text-orange-500"
//                                 >
//                                     <ShoppingCart className="w-5 h-5" />
//                                     <span>
//                                         Cart
//                                     </span>
//                                 </Link>

//                                 <Link
//                                     to="/orders"
//                                     className="flex items-center gap-3 w-full rounded-lg p-3 text-left
//                                     hover:bg-orange-100 hover:text-orange-500"
//                                 >
//                                     <Package className="w-5 h-5" />
//                                     <span>
//                                         Orders
//                                     </span>
//                                 </Link>
//                             </div>

//                             {/* Logout */}
//                             <div className="border-t border-gray-200 p-3">
//                                 <button
//                                     className="flex items-center gap-3 rounded-lg hover:bg-red-100
//                                     w-full text-red-500 text-left p-3 cursor-pointer"
//                                     type="button"
//                                     onClick={handleLogout}
//                                 >
//                                     <LogOut className="w-5 h-5" />
//                                     <span>
//                                         Logout
//                                     </span>
//                                 </button>
//                             </div>
//                         </div>
//                     )
//                 }

//                 {/* Login */}
//                 {
//                     !user && (
//                         <div className="border border-gray-200 p-3">
//                             <button
//                                 className="flex items-center gap-3 rounded-lg hover:bg-orange-100
//                                     w-full text-slate-900 text-left p-3 cursor-pointer hover:text-orange-500"
//                                 type="button"
//                                 onClick={() => navigate("/login")}
//                             >
//                                 <span>
//                                     Login
//                                 </span>
//                             </button>
//                         </div>
//                     )
//                 }
//             </div>
//         </>
//     )
// }


function ProfileCard({ isProfileOpen, setIsProfileOpen }) {
    const { user, handleLogoutUser, clearUser } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsProfileOpen(false);
    }, [location, setIsProfileOpen]);

    const handleLogout = async () => {
        try {
            await handleLogoutUser();
            showToast("Logout successful", "success");
            navigate("/");
            clearUser();
        } catch (error) {
            showToast("Failed to logout", "error");
        }
    };

    const menuItems = [
        {
            label: "Profile",
            icon: CircleUserRound,
            to: "/profile",
        },
        {
            label: "Wishlist",
            icon: Heart,
        },
        {
            label: "Cart",
            icon: ShoppingCart,
            to: "/cart",
        },
        {
            label: "Orders",
            icon: Package,
            to: "/orders",
        },
    ];

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px] transition-opacity ${
                    isProfileOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }`}
                onClick={() => setIsProfileOpen(false)}
            />

            {/* Profile Card */}
            <div
                className={`fixed top-16 right-4 z-50 w-72 overflow-hidden
                    rounded-xl border border-slate-200 bg-white
                    shadow-xl shadow-slate-900/10
                    transition-all duration-200
                    ${
                        isProfileOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-2 opacity-0"
                    }`}
            >
                {user ? (
                    <>
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-slate-100 p-4">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-slate-400">
                                    Welcome back
                                </p>

                                <h2 className="mt-1 truncate text-sm font-semibold text-slate-900">
                                    {user.fullName}
                                </h2>
                            </div>

                            <button
                                type="button"
                                aria-label="Close profile menu"
                                className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                                    text-slate-400 transition-colors
                                    hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => setIsProfileOpen(false)}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Menu */}
                        <div className="p-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        className="group flex w-full items-center gap-3
                                            rounded-lg px-3 py-2.5
                                            text-sm font-medium text-slate-600
                                            transition-colors
                                            hover:bg-orange-50 hover:text-orange-600"
                                    >
                                        <span
                                            className="flex h-8 w-8 shrink-0 items-center justify-center
                                                rounded-lg bg-slate-50 text-slate-500
                                                transition-colors
                                                group-hover:bg-orange-100 group-hover:text-orange-600"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>

                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Logout */}
                        <div className="border-t border-slate-100 p-2">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="group flex w-full cursor-pointer items-center gap-3
                                    rounded-lg px-3 py-2.5
                                    text-left text-sm font-medium text-red-500
                                    transition-colors
                                    hover:bg-red-50"
                            >
                                <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center
                                        rounded-lg bg-red-50 text-red-500
                                        transition-colors
                                        group-hover:bg-red-100"
                                >
                                    <LogOut className="h-4 w-4" />
                                </span>

                                <span>Logout</span>
                            </button>
                        </div>
                    </>
                ) : (
                    /* Login */
                    <div className="p-2">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="group flex w-full cursor-pointer items-center gap-3
                                rounded-lg px-3 py-3
                                text-left text-sm font-medium text-slate-700
                                transition-colors
                                hover:bg-orange-50 hover:text-orange-600"
                        >
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center
                                    rounded-lg bg-orange-50 text-orange-500
                                    transition-colors
                                    group-hover:bg-orange-100"
                            >
                                <CircleUserRound className="h-4 w-4" />
                            </span>

                            <span>Login</span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}


export default ProfileCard