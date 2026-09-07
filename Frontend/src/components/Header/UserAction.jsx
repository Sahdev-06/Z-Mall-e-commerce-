import { Heart, ShoppingCart, CircleUserRound } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProfileCard from "../Profile/ProfileCard";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";


function UserAction({ cartNumber }) {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const navigate = useNavigate();
    const { cartCount, refreshCart } = useCart();

    function navigateToCart () {
        navigate("/cart")
    }

    return (
        <>
            <div className="flex gap-5">
                <button 
                    className="hidden md:flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                        showToast("We are working on this feature", "error")
                    }}
                >
                    <Heart className="w-6 h-6 "/>
                    <span className="hidden lg:inline">
                        Wishlist
                    </span>
                </button>
                <button className="flex items-center gap-2 relative cursor-pointer"
                    onClick={navigateToCart}
                >
                    <div className="relative">
                        {
                        cartCount > 0 && (
                            <div
                                className="w-5 h-5 bg-orange-500 absolute -right-1 -top-2.5 rounded-full
                                    flex items-center justify-center text-white text-sm font-medium"
                            >
                                { cartCount }
                            </div>
                        )
                    }
                        <ShoppingCart className="w-6 h-6"/>
                    </div>
                    <span className="hidden lg:inline">
                        Cart
                    </span>
                </button>
                <button 
                    className="hidden md:flex items-center gap-2 cursor-pointer"
                    onClick={()=> setIsProfileOpen(true)}
                >
                    <CircleUserRound className="w-6 h-6"/>
                    <span className="hidden lg:inline">
                        {
                            user ? user.fullName : "Account"
                        }
                    </span>
                </button>

                <ProfileCard 
                    isProfileOpen={isProfileOpen}
                    setIsProfileOpen={setIsProfileOpen}
                />
            </div>
        </>
    )
}


export default UserAction