import { ShieldCheck } from "lucide-react";
import Logo from "../Header/Logo"


function PaymentHeader() {
    return (
        <>
            <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 sm:h-18 flex items-center justify-between">

                        {/* Logo */}
                        <Logo />


                        {/* Center Title - Desktop */}
                        <div className="hidden sm:flex flex-col items-center">
                            <p className="text-base lg:text-lg font-semibold text-slate-900">
                                Secure Checkout
                            </p>

                            <p className="text-xs text-gray-500">
                                Complete your order securely
                            </p>
                        </div>


                        {/* Security Indicator */}
                        <div className="flex items-center gap-2">
                            <div className="
                            w-8 h-8
                            flex items-center justify-center
                            rounded-full
                            bg-orange-50
                        ">
                                <ShieldCheck className="w-4 h-4 text-orange-500" />
                            </div>

                            <div className="hidden xs:block">
                                <p className="text-xs sm:text-sm font-medium text-slate-900">
                                    Secure Payment
                                </p>

                                <p className="hidden md:block text-xs text-gray-500">
                                    Safe & encrypted
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}



export default PaymentHeader