import { X, Heart, Package, CircleUserRound, LogOut, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx"
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useLocation } from "react-router-dom";

function MenuSlidebar({ isSidebarOpen, setIsSidebarOpen}) {

    const { user, handleLogoutUser, clearUser } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location, setIsSidebarOpen]);

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

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-black/40
                    ${isSidebarOpen ? "block" : "hidden"}`}
                onClick={() => setIsSidebarOpen(false)}
            />
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-72 bg-white border-r border-gray-200
                            transition-transform duration-300 flex flex-col overflow-y-auto
                            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200
                                p-4"
                >
                    <div>
                        <p className="text-sm text-gray-500">
                            Welcome back
                        </p>
                        <h2 className="font-semibold text-gray-900">
                            {user ? (
                                user.fullName
                            ) : (
                                <Link
                                    to="/login"
                                    className="text-orange-500 underline"
                                >
                                    Login
                                </Link>
                            )}
                        </h2>
                    </div>

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                {/* Menu */}
                <div className="flex-1 overflow-y-auto px-3 py-4">
                    <button
                        onClick={() => navigate("/profile")}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left 
                        hover:text-orange-500 hover:bg-orange-100 cursor-pointer"
                    >
                        <CircleUserRound className="h-5 w-5"/>
                        <span>
                            Account
                        </span>
                    </button>

                    <button
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left 
                        hover:text-orange-500 hover:bg-orange-100 cursor-pointer"
                    >
                        <Heart className="h-5 w-5"/>
                        <span>
                            Wishlist
                        </span>
                    </button>

                    <button
                        onClick={() => navigate("/profile/orders")}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left 
                        hover:text-orange-500 hover:bg-orange-100 cursor-pointer"
                    >
                        <Package className="h-5 w-5"/>
                        <span>
                            Orders
                        </span>
                    </button>

                    <button
                        onClick={() => navigate("/profile/addresses")}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left 
                        hover:text-orange-500 hover:bg-orange-100 cursor-pointer"
                    >
                        <MapPin className="h-5 w-5"/>
                        <span>
                            Addresses
                        </span>
                    </button>
                </div>

                {/* Logout */}
                <div className="shrink-0 mt-auto border-t border-gray-200 p-3">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-lg p-3 text-left text-red-500 
                        cursor-pointer hover:bg-red-100"
                    >
                        <LogOut className="w-5 h-5"/>
                        <span>
                            Logout
                        </span>
                    </button>
                </div>
            </aside>
        </>
    )
}


export default MenuSlidebar