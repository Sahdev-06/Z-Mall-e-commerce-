import { ArrowRight, Tag } from "lucide-react";
import { useCart } from "../../context/CartContext"
import { useCheckout } from "../../context/CheckoutContext";
import { useNavigate } from "react-router-dom"
import { useState } from "react";

function OrderSummary({ btnText, navigateTo, state }) {
    const { orderSummary, handleCouponSubmit } = useCart();
    const { subtotal, total, discount, quantity, checkoutType } = useCheckout();

    const [formData, setFormData] = useState({
        code : "",
    })

    const [error, setError] = useState("")

    const summary = checkoutType === "buy-now"
    ? {
        subTotal: subtotal,
        totalDiscount: discount,
        total: total
    }
    : orderSummary;


    const navigate = useNavigate();

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            [name] : value
        })
    }

    // handle code submit 
    const handleSubmit = async (e) => {
        if (!formData.code.trim()) {
            setError("Enter coupon code");
            return;
        }

        try {
            await handleCouponSubmit(e, formData);
            setError("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to apply coupon"
            );
        }
    }


    return (
        <>
            <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm p-6 h-fit mb-2">
                {/* Header */}
                <h2 className="text-lg font-semibold text-slate-900">
                    Order Summary
                </h2>

                {/* Price Details */}
                <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-gray-600">
                            Subtotal
                        </span>
                        <span className="font-medium text-gray-900">
                            {summary.subTotal.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-gray-600">
                            Discount
                        </span>
                        <span className="font-medium text-green-600">
                            - {summary.totalDiscount.toLocaleString('en-IN')}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-gray-600">
                            Shipping
                        </span>
                        <span className="font-medium text-green-600">
                            FREE
                        </span>
                    </div>
                </div>

                {/* Coupon */}
                <div className="mt-6 border-t border-gray-100 pt-6">
                    <label
                        htmlFor="coupon"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Have a coupon?
                    </label>

                    <div className="flex gap-2">
                        <div className="relative min-w-0 flex-1">
                            <Tag
                                className="pointer-events-none absolute left-3 top-1/2 
                                size-4 -translate-y-1/2 text-gray-400"
                                aria-hidden="true"
                            />

                            <input
                                id="coupon"
                                type="text"
                                name="code"
                                value={formData.code.toUpperCase()}
                                onChange={handleChange}
                                placeholder="Enter coupon code"
                                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 
                                pl-9 pr-3 text-sm text-gray-900 outline-none transition 
                                placeholder:text-gray-400 focus:border-gray-400 focus:bg-white 
                                focus:ring-2 focus:ring-gray-100 uppercase"
                            />

                        </div>

                            
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="h-11 shrink-0 rounded-xl border border-gray-200 px-4 text-sm 
                            font-semibold text-gray-900 transition hover:bg-gray-50 active:bg-gray-100"
                        >
                            Apply
                        </button>
                    </div>
                    
                    {error && (
                        <p className="text-red-500 text-sm mt-1">
                            {error}
                        </p>
                    )}
                </div>

                {/* Total */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-base font-semibold text-gray-900">
                            Total 
                        </p>
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            {summary.total.toLocaleString('en-IN')}
                        </span>
                    </div>
                </div>

                {/* Checkout */}
                <button 
                    type="button"
                    onClick={() => navigate(`${navigateTo}`, {
                        state : state
                    })}
                    className="mt-6 hidden h-12 w-full items-center justify-center gap-2 rounded-xl 
                        bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 
                        active:bg-orange-700 lg:flex"
                >
                    { btnText }
                    <ArrowRight className="size-4" aria-hidden="true" />
                </button>
            </div>
        </>
    )
}


export default OrderSummary