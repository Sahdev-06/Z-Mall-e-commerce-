import { Handbag } from "lucide-react";
import { useCart } from "../../context/CartContext";


function SummaryCard({ handleOrderPlaced }) {
    const { orderSummary, cartCount } = useCart();

    return (
        <>
            <div className="p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5 bg-white shadow-sm rounded-sm 
                            border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                    <p className="text-base sm:text-lg font-medium text-slate-900">
                        Order Summary
                    </p>

                    <div className="flex items-center gap-1 font-medium shrink-0">
                        <Handbag className="w-4 h-4 text-orange-500" />

                        <span className="text-xs sm:text-sm text-orange-500">
                            {cartCount} Items
                        </span>
                    </div>
                </div>


                {/* Summary Details */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                    <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                        <p className="text-gray-600">
                            Subtotal
                        </p>

                        <span className="text-slate-900 font-medium">
                            ₹{orderSummary.subTotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                        <p className="text-gray-600">
                            Total Discount
                        </p>

                        <span className="text-green-600 font-medium">
                            -₹{orderSummary.totalDiscount.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 text-sm sm:text-base">
                        <p className="text-gray-600">
                            Shipping
                        </p>

                        <span className="text-green-600 font-medium">
                            Free
                        </span>
                    </div>

                    <hr className="border-gray-200 my-1 sm:my-2" />

                    {/* Total */}
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-base sm:text-lg font-semibold text-slate-900">
                            Total
                        </p>

                        <span className="text-lg sm:text-xl font-semibold text-slate-900">
                            ₹{orderSummary.total.toLocaleString("en-IN")}
                        </span>
                    </div>
                </div>


                {/* Place Order */}
                <button
                    className="
                        hidden
                        lg:block
                        w-full
                        min-h-11
                        py-2.5
                        px-4
                        rounded-lg
                        text-sm sm:text-base
                        font-medium
                        text-white
                        bg-orange-500
                        hover:bg-orange-600
                        active:bg-orange-700
                        cursor-pointer
                        transition-colors duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-orange-500
                        focus:ring-offset-2
                    "
                    onClick={handleOrderPlaced}
                >
                    Place Order
                </button>
            </div>
        </>
    )
}



export default SummaryCard