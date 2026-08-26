import { ArrowLeft } from "lucide-react"
import { useAddress } from '../context/AddressContext';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { createOrder, createBuyNowOrder } from '../services/orderService';
import { useToast } from "../context/ToastContext";
import { useCart } from "../context/CartContext";
import PaymentHeader from "../components/Payment/PaymentHeader";
import PaymentMethod from "../components/Payment/PaymentMethod";
import SummaryCard from "../components/Payment/SummaryCard";
import FixedPaymenttBar from "../components/Payment/FixedPaymentBar";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const state = location.state

    const { showToast } = useToast();
    const { selectedAddress } = useAddress();
    const { refreshCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState("")

    // handle order creation
    async function handleOrderPlaced() {

        if(paymentMethod === "") {
            showToast("Please select a payment method", "error")
            return;
        }

        // const orderData = {
        //     paymentMethod,
        //     addressId : selectedAddress?._id
        // }

        const orderData = {}
        if(state.checkoutType === 'cart') {
            orderData.paymentMethod = paymentMethod
            orderData.addressId = selectedAddress?._id

        }

        if(state.checkoutType === 'buy-now') {
            orderData.paymentMethod = paymentMethod
            orderData.addressId = selectedAddress?._id
            orderData.productId = state.productId
            orderData.quantity = state.quantity
        }

        console.log("order data : ", orderData)
        
        try {
            if(state.checkoutType === 'cart') {
                const result = await createOrder(orderData)
                refreshCart()
                navigate("/order-confirmation")
            } else if(state.checkoutType === 'buy-now') {
                const result = await createBuyNowOrder(orderData)
                navigate("/order-confirmation")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <div className="min-h-screen bg-gray-50">

            {/* Sticky Payment Header */}
            <PaymentHeader />


            {/* Main Content */}
            <main className="
                max-w-7xl
                mx-auto
                px-4
                pt-5
                pb-24
                sm:px-6 sm:pt-6
                lg:px-8 lg:py-8 lg:pb-8"
            >

                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => navigate("/checkout/address")}
                    className="
                        mb-5
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-gray-600
                        hover:text-slate-900
                        transition-colors
                        duration-200
                        cursor-pointer
                        focus:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-orange-500
                        focus-visible:ring-offset-2
                        rounded-sm
                    "
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Checkout</span>
                </button>


                {/* Page Content */}
                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-5
                    lg:gap-6
                    items-start
                ">

                    {/* Payment Methods */}
                    <section className="lg:col-span-2">
                        <PaymentMethod 
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                        />
                    </section>


                    {/* Order Summary */}
                    <aside className="lg:col-span-1">
                        <SummaryCard 
                            handleOrderPlaced={handleOrderPlaced}
                        />
                    </aside>

                </div>

            </main>

            {/* Fixed btn for mobile + Tab */}
            <FixedPaymenttBar 
                btnText={"Place Order"}
                handleOrderPlaced={handleOrderPlaced}
            />
        </div>
    )
}


export default Payment