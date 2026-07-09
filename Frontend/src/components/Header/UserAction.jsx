import { Heart, ShoppingCart, CircleUserRound } from "lucide-react";


function UserAction() {
    return (
        <>
            <div className="flex gap-5">
                <div className="flex items-center flex-col text-xs cursor-pointer select-none">
                    <Heart />
                    <span>Wishlist</span>
                </div>
                <div className="flex items-center flex-col text-xs cursor-pointer select-none">
                    <ShoppingCart />
                    <span>Cart</span>
                </div>
                <div className="flex items-center flex-col text-xs cursor-pointer select-none">
                    <CircleUserRound />
                    <span>Account</span>
                </div>
            </div>
        </>
    )
}


export default UserAction