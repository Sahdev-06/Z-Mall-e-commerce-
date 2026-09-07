import { createContext, useContext, useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getProductById } from "../services/productService";
import Loading from "../components/Common/Loading";

const CheckoutContext = createContext();

function CheckoutProvider({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    const state = location.state

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(!user || user.role !== "customer") {
            setProduct({})
            setLoading(false)
            return;
        }

        if(state?.checkoutType === 'buy-now') {
            const fetchProduct = async () => {
                try {
                    const result = await getProductById(state?.productId)
                    setProduct(result.data)
                } catch (error) {
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }

            fetchProduct();
            return
        }

        setProduct({})
        setLoading(false)

    }, [user, state?.checkoutType, state?.productId])

    const subtotal = product.price * state?.quantity
    const discount = ((product.price) * (product.discount / 100)) * state?.quantity
    const total = subtotal - discount
    const quantity = state?.quantity
    const checkoutType = state?.checkoutType

    if(loading) {
        return <Loading />
    }

    return (
        <CheckoutContext.Provider
            value={{
                subtotal,
                discount,
                total,
                quantity,
                checkoutType
            }}
        >
            { children }
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    return useContext(CheckoutContext)
}

export default CheckoutProvider