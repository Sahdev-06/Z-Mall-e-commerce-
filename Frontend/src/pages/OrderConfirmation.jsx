import { Link, useLocation } from "react-router-dom";
import { CircleCheck } from "lucide-react";


export default function OrderConfirmation() {
  const location = useLocation();

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center
                     bg-gray-50 px-4 py-10 sm:px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full 
                        bg-green-100 sm:h-20 sm:w-20">
          <CircleCheck
            className="h-9 w-9 text-green-600 sm:h-11 sm:w-11"
            strokeWidth={1.8}
          />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Order Confirmed!
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
          Thank you for your order. We&apos;ve received it and will start
          processing it shortly.
        </p>

        {/* Order Number */}
        <div className="mt-6 rounded-xl bg-gray-50 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Order Number
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            #ORD-{location.state.id}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/profile/orders"
            className="
              flex-1
              rounded-xl
              bg-gray-900
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-gray-800
              focus:outline-none
              focus:ring-2
              focus:ring-gray-900
              focus:ring-offset-2
            "
          >
            View Order
          </Link>

          <Link
            to="/"
            className="
              flex-1
              rounded-xl
              border
              border-gray-200
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              transition
              hover:bg-gray-50
              focus:outline-none
              focus:ring-2
              focus:ring-gray-300
              focus:ring-offset-2
            "
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}