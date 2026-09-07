import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";
import {
    getCartItems,
    removeCartItem,
    removeAllCartItems,
    updateCartItemQty
} from "../services/cartService"
import { useAuth } from "./AuthContext";

import { applyCouponCode } from "../services/couponService";


const CartContext = createContext();

function CartProvider({ children }) {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState()
    const [coupon, setCoupon] = useState(null)

    const location = useLocation();
    const previousPath = useRef(location.pathname);


    // fetch cart items
    useEffect(() => {
        if(!user || user.role !== "customer") {
            setCartItems([])
            setLoading(false)
            return;
        }

        const fetchItems = async () => {
            try {
                const result = await getCartItems()
                setCartItems(result.data.items)
            } catch (error) {
                setError("Failed to load cart items")
            } finally {
                setLoading(false)
            }
        }

        fetchItems();
    }, [user])

    // for clear coupon
    useEffect(() => {
        if (
            location.pathname === "/cart" &&
            previousPath.current !== "/checkout/address" &&
            previousPath.current !== "/payment"
        ) {
            setCoupon(null);
        }

        previousPath.current = location.pathname;
    }, [location.pathname]);

    let subTotal = 0;
    let totalDiscount = 0;

    cartItems.forEach((item) => {
        subTotal += item.product.price * item.quantity
        totalDiscount += (item.product.price * ( item.product.discount / 100)) * item.quantity
    })

    const orderSummary = {
        subTotal,
        totalDiscount : totalDiscount + (coupon?.discountAmount || 0),
        total : subTotal - totalDiscount - (coupon?.discountAmount || 0)
    }

    // refresh cart 
    const refreshCart = async () => {
        const result = await getCartItems()

        setError("")
        setCartItems(result.data.items)
    }

    // remove cart item
    const handleRemoveCartItem = async (id) => {
        try {
            await removeCartItem(id)

            setCartItems((prevItems) =>
                prevItems.filter((item) => item.product._id !== id)
            )

            setCoupon(null)

        } catch (error) {
            setError("Failed to delete cart item")
        }
    }

    // clear all cart items
    const handleClearCartItems = async () => {
        try {
            const result = await removeAllCartItems()
            setCartItems(result.data.items)

            setCoupon(null)
        } catch (error) {
            console.log(error)
        }
    }

    // update cart item qty
    const handleIncreaseQty = async (id) => {
        const item = cartItems.find(item => item.product._id === id);
        const newQty = item.quantity + 1;
        try {
            await updateCartItemQty(id, { quantity: newQty })
            setCartItems(prev =>
                prev.map(item =>
                    item.product._id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            )

            setCoupon(null)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDecreaseQty = async (id) => {
        const item = cartItems.find(item => item.product._id === id);
        if (item.quantity === 1) return;

        const newQty = item.quantity - 1;

        try {
            await updateCartItemQty(id, { quantity: newQty })
            setCartItems(prev =>
                prev.map(item =>
                    item.product._id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            )

            setCoupon(null)
        } catch (error) {
            console.log(error)
        }
    }

    // set cart count
    const cartCount = cartItems.length;

    // handle submit coupon
    const handleCouponSubmit = async (e, formData) => {
        e.preventDefault();

        const result = await applyCouponCode(formData)

        setCoupon(result.data)

        return result.data

    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount,
                orderSummary,
                refreshCart,
                handleRemoveCartItem,
                handleClearCartItems,
                handleIncreaseQty,
                handleDecreaseQty,
                loading,
                error,
                setCoupon,
                coupon,
                handleCouponSubmit
            }}
        >
            {children}
        </CartContext.Provider>
    )
}



export function useCart() {
    return useContext(CartContext);
}

export default CartProvider