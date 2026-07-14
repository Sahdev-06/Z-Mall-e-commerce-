

function OrderSummary() {
    return (
        <>
            <div className="flex flex-col gap-4 bg-white rounded-2xl shadow-sm p-6 h-fit mb-2">
                <h2 className="text-xl font-semibold text-slate-900">
                    Order Summary
                </h2>
                <div className="flex justify-between items-center">
                    <p>
                        Subtotal
                    </p>
                    <span>
                        ₹ 1,999
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <p>
                        Shipping
                    </p>
                    <span>
                        FREE
                    </span>
                </div>
                <hr className="border-gray-200 my-2"/>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-slate-900">
                        Total 
                    </p>
                    <span>
                        ₹ 1,999
                    </span>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold
                                    py-3 rounded-xl transition duration-300 mt-6">
                    Proceed to Checkout
                </button>
            </div>
        </>
    )
}


export default OrderSummary