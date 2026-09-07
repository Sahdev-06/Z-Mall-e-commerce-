import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { getCartItems } from "../../services/cartService.js";
import Loading from "./Loading.jsx";

function CheckoutGuard({ children }) {
    const [isChecking, setIsChecking] = useState(true)

    const { cartCount } = useCart();
    const { showToast } = useToast();

    const navigate = useNavigate();
    const location = useLocation();

    const { checkoutType } = location.state || {}


    useEffect(() => {
        const checkCart = async () => {
            try {
                const cartResult = await getCartItems()
    
                const cartItems = cartResult.data.items

                if(checkoutType !== "buy-now") {
                    if(cartItems.length === 0) {
                        navigate("/cart")
                        showToast("Please add products to cart")
                        return
                    }
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsChecking(false)
            }
        }

        checkCart();
    }, [navigate])

    if(isChecking) {
        return <Loading />
    }

    return children
}


export default CheckoutGuard