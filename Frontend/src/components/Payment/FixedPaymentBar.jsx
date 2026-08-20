import { useCart } from "../../context/CartContext"
import { ArrowRight } from "lucide-react";


function FixedPaymenttBar({ btnText, handleOrderPlaced }) {
    const { orderSummary } = useCart();

    return (
            <>
                <div className="fixed inset-x-0 bottom-0 z-50 border-t border-orange-200 bg-white/95 p-3 
                                shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm lg:hidden sm:p-4">
                    <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3">
                        {/* Total */}
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-gray-500">
                                Total
                            </p>
                    
                            <p className="mt-0.5 truncate text-lg font-bold text-gray-900 sm:text-xl">
                                ₹{orderSummary.total.toLocaleString('en-IN')}
                            </p>
                        </div>
    
                        {/* Checkout Button */}
                        <button
                        type="button"
                        onClick={handleOrderPlaced}
                        className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl 
                                    bg-orange-500 px-4 text-sm font-semibold text-white shadow-sm 
                                    transition hover:bg-orange-600 active:bg-orange-700 sm:h-12 sm:px-6"
                        >
                        <span>
                            { btnText }
                        </span>
                        <ArrowRight className="size-4 sm:size-5" />
                        </button>
                    </div>
                </div>
            </>
        )
}



export default FixedPaymenttBar