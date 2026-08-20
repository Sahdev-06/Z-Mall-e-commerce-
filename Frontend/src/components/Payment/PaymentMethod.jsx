import { Wallet, CreditCard, Landmark, QrCode, Shield } from 'lucide-react';
import { useState } from 'react';


function PaymentMethod({ paymentMethod, setPaymentMethod }) {

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-sm shadow-lg p-4 sm:p-6 
                        flex flex-col gap-4">
                {/* Header */}
                <div>
                    <p className="text-lg sm:text-xl text-slate-900 font-medium">
                        Select Payment Method
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                        All transactions are secured and encrypted
                    </p>
                </div>

                {/* Payment Methods */}
                <div className="flex flex-col gap-3 sm:gap-4">

                    {/* Cash on Delivery */}
                    <div
                        className={`
                            flex items-center gap-3 sm:gap-4
                            p-3 sm:p-4
                            border border-gray-200 rounded-lg
                            transition-all duration-200
                            hover:border-orange-500
                            cursor-pointer
                            ${
                                paymentMethod === "COD"
                                    ? "ring-2 ring-orange-500"
                                    : ""
                            }
                        `}
                        onClick={() => setPaymentMethod("COD")}
                    >
                        <div className="shrink-0 bg-orange-200 w-9 h-9 sm:w-10 sm:h-10 flex items-center 
                                        justify-center rounded-sm">
                            <Wallet className="w-5 h-5 sm:w-5 sm:h-5 text-orange-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm sm:text-base text-slate-900 font-medium">
                                    Cash on Delivery
                                </p>

                                <span className="w-fit text-xs text-green-700 font-medium bg-green-100 
                                                px-2 py-1 rounded-sm">
                                    Available
                                </span>
                            </div>

                            <p className="text-gray-700 text-xs sm:text-sm mt-1">
                                Pay when your order arrives at your doorstep
                            </p>
                        </div>
                    </div>


                    {/* UPI */}
                    <div
                        className="
                            flex items-center gap-3 sm:gap-4
                            p-3 sm:p-4
                            border border-gray-200 rounded-lg
                            opacity-50
                            cursor-not-allowed
                        "
                    >
                        <div className="shrink-0 bg-orange-200 w-9 h-9 sm:w-10 sm:h-10 flex items-center
                                         justify-center rounded-sm">
                            <QrCode className="w-5 h-5 text-orange-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm sm:text-base text-slate-900 font-medium">
                                    UPI
                                </p>

                                <span className="w-fit text-xs text-gray-700 font-medium bg-gray-100 px-2 
                                                    py-1 rounded-sm">
                                    Coming Soon
                                </span>
                            </div>

                            <p className="text-gray-700 text-xs sm:text-sm mt-1">
                                Pay using any UPI app
                            </p>
                        </div>
                    </div>


                    {/* Credit / Debit Card */}
                    <div
                        className="
                            flex items-center gap-3 sm:gap-4
                            p-3 sm:p-4
                            border border-gray-200 rounded-lg
                            opacity-50
                            cursor-not-allowed
                        "
                    >
                        <div className="shrink-0 bg-orange-200 w-9 h-9 sm:w-10 sm:h-10 flex items-center 
                                        justify-center rounded-sm">
                            <CreditCard className="w-5 h-5 text-orange-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm sm:text-base text-slate-900 font-medium">
                                    Credit/Debit Card
                                </p>

                                <span className="w-fit text-xs text-gray-700 font-medium bg-gray-100 
                                                    px-2 py-1 rounded-sm">
                                    Coming Soon
                                </span>
                            </div>

                            <p className="text-gray-700 text-xs sm:text-sm mt-1">
                                Visa, MasterCard, Rupay & more
                            </p>
                        </div>
                    </div>


                    {/* Net Banking */}
                    <div
                        className="
                            flex items-center gap-3 sm:gap-4
                            p-3 sm:p-4
                            border border-gray-200 rounded-lg
                            opacity-50
                            cursor-not-allowed
                        "
                    >
                        <div className="shrink-0 bg-orange-200 w-9 h-9 sm:w-10 sm:h-10 flex items-center 
                                                justify-center rounded-sm">
                            <Landmark className="w-5 h-5 text-orange-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm sm:text-base text-slate-900 font-medium">
                                    Net Banking
                                </p>

                                <span className="w-fit text-xs text-gray-700 font-medium bg-gray-100 
                                                px-2 py-1 rounded-sm">
                                    Coming Soon
                                </span>
                            </div>

                            <p className="text-gray-700 text-xs sm:text-sm mt-1">
                                All major banks supported
                            </p>
                        </div>
                    </div>
                </div>


                {/* Security Message */}
                <div className="flex items-start gap-3 sm:gap-4 bg-orange-50 rounded-lg p-3 sm:p-4">
                    <Shield className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />

                    <p className="text-xs sm:text-sm text-gray-700 leading-5">
                        Your payment details are safe with us. We do not store any card
                        or bank details.
                    </p>
                </div>
            </div>
        </>
    )
}



export default PaymentMethod