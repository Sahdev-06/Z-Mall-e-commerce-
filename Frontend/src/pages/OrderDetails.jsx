import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById, cancelOrder } from "../services/orderService"
import { MapPin } from "lucide-react";
import OrderCard from "../components/Order/OrderCard";
import Loading from "../components/Common/Loading"
import ErrorState from "../components/Common/ErrorState";
import Breadcrumb from "../components/Common/Breadcrumb";


function OrderDetails() {

    const { id } = useParams();

    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const result = await getOrderById(id)
                setOrder(result.data)
            } catch (error) {
                console.log(error)
                setError("Failed to load order detail")
            } finally {
                setLoading(false)
            }
        }

        fetchOrder();
    }, [id])


    // cancel order
    const handleCancelOrder = async () => {
        try {
            const result = await cancelOrder(id)
            setOrder(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return <Loading />
    }

    if(error) {
        return <ErrorState message={error}/>
    }


    return (
        <>
            <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
    <div className="mx-auto w-full max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-5">
            <Breadcrumb />
        </div>

        {/* Page Heading */}
        <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Order Details
            </h1>

            <p className="mt-1 text-sm text-slate-500">
                Review your order and delivery details
            </p>
        </div>

        {/* =========================
            ORDER DETAILS CONTENT
        ========================== */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">

            {/* LEFT / MAIN CONTENT */}
            <div className="flex min-w-0 flex-col gap-5 md:col-span-2 lg:gap-6">

                {/* Order Items */}
                <div className="min-w-0">
                    <OrderCard
                        orderId={order._id}
                        orderItems={order.orderItems}
                        orderStatus={order.orderStatus}
                        createdAt={order.createdAt}
                        showViewDetails={false}
                        showCancelOrder={true}
                        onCancel={handleCancelOrder}
                        cancelledAt={order.cancelledAt}
                        deliveredAt={order.deliveredAt}
                    />
                </div>

                {/* Address */}
                <div
                    className="
                        rounded-xl
                        border border-orange-100
                        bg-orange-50
                        p-4
                        sm:p-5
                        lg:p-6
                    "
                >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                        <MapPin
                            className="
                                h-5 w-5 shrink-0
                                text-orange-500
                                sm:h-6 sm:w-6
                            "
                        />

                        <span className="text-base font-semibold text-slate-900 sm:text-lg">
                            Delivery Address
                        </span>
                    </div>

                    <div className="mt-4 space-y-1">
                        <p className="text-base font-bold text-slate-900 sm:text-lg">
                            {order.shippingAddress.fullName}
                        </p>

                        <p className="text-sm font-medium text-slate-600 sm:text-base">
                            {order.shippingAddress.phoneNumber}
                        </p>

                        <p className="text-sm font-medium leading-6 text-slate-600 sm:text-base">
                            {order.shippingAddress.street},{" "}
                            {order.shippingAddress.landmark}
                        </p>

                        <p className="text-sm font-medium leading-6 text-slate-600 sm:text-base">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state} -{" "}
                            {order.shippingAddress.postalCode}
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT / SIDEBAR */}
            <div className="flex flex-col gap-5 md:col-span-1 lg:gap-6">

                {/* Order Summary */}
                <div
                    className="
                        rounded-xl
                        border border-slate-200
                        bg-white
                        p-4 shadow-sm
                        sm:p-5
                        lg:p-6
                    "
                >
                    <p className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
                        Order Summary
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                            <p>Subtotal</p>

                            <span className="shrink-0 text-slate-900">
                                ₹{order.itemsPrice.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                            <p>Total Discount</p>

                            <span className="shrink-0 text-slate-900">
                                ₹{order.discountAmount.toLocaleString("en-IN")}
                            </span>
                        </div>

                        {/* coupon discount */}
                        {order.coupon.code && (
                            <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                                <p>Coupon ({order.coupon.code})</p>

                                <span className="shrink-0 text-slate-900">
                                    ₹{order.coupon.discountAmount.toLocaleString("en-IN")}
                                </span>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
                            <p>Shipping</p>

                            <span className="font-medium text-green-600">
                                Free
                            </span>
                        </div>

                        <hr className="my-1 border-slate-200" />

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-base font-semibold text-slate-900 sm:text-lg">
                                Total
                            </p>

                            <span className="shrink-0 text-base font-bold text-slate-900 sm:text-lg">
                                ₹{order.totalAmount.toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div
                    className="
                        rounded-xl
                        border border-slate-200
                        bg-white
                        p-4 shadow-sm
                        sm:p-5
                        lg:p-6
                    "
                >
                    <p className="mb-4 text-base font-semibold text-slate-900 sm:text-lg">
                        Payment Information
                    </p>

                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-xs text-slate-500 sm:text-sm">
                                Payment Method
                            </p>

                            <div className="mt-1 flex items-center justify-between gap-3">
                                <p className="text-sm font-medium text-slate-800 sm:text-base">
                                    {order.paymentMethod}
                                </p>

                                <span
                                    className={`
                                        shrink-0 rounded-full px-2.5 py-1
                                        text-xs font-medium
                                        ${
                                            order.paymentStatus === "Pending"
                                                ? "bg-orange-100 text-orange-600"
                                                : order.paymentStatus === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : order.paymentStatus === "Failed"
                                                ? "bg-red-100 text-red-600"
                                                : order.paymentStatus === "Refunded"
                                                ? "bg-purple-100 text-purple-700"
                                                : order.paymentStatus === "Cancelled"
                                                ? "bg-slate-100 text-slate-600"
                                                : "bg-gray-100 text-gray-600"
                                        }
                                    `}
                                >
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <p className="text-xs text-slate-500 sm:text-sm">
                                Amount
                            </p>

                            <span className="shrink-0 text-sm font-semibold text-slate-900 sm:text-base">
                                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
        </>

    )
}


export default OrderDetails