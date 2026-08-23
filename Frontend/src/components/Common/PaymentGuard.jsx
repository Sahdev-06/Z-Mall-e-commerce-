import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { getCartItems } from "../../services/cartService.js";
import { getAllAddresses } from "../../services/addressService.js";
import Loading from "./Loading.jsx";


function PaymentGuard({ children }) {
    const [isChecking, setIsChecking] = useState(true)
    const navigate = useNavigate();



    useEffect(() => {

        const checkCheckout = async () => {
            try {
                const cartResult = await getCartItems()
                const addressResult = await getAllAddresses()

                const cartItems = cartResult.data.items
                const addresses = addressResult.data

                const selectedAddress = addresses.find(
                    address => address.isDefault === true
                )

                if (cartItems.length === 0) {
                    navigate("/cart")
                    return
                }

                if (!selectedAddress) {
                    navigate("/checkout/address")
                    return
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsChecking(false)
            }
        }

        checkCheckout()

    }, [navigate])

    if(isChecking) {
        return <Loading />
    }

    return children
}


export default PaymentGuard