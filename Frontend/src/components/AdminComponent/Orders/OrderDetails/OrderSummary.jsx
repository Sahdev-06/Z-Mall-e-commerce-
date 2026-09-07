import { Receipt } from "lucide-react";

function OrderSummary({ subTotal, discount, total}) {
  // const subtotal = 3499;
  // const discount = 350;
  // const shipping = 0;
  // const total = subtotal - discount + shipping;

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F97316]">
          <Receipt size={18} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            Order Summary
          </h2>

          <p className="text-xs text-gray-500">
            Complete pricing breakdown.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Subtotal
          </span>

          <span className="font-medium text-gray-800">
            {formatAmount(subTotal)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Discount
          </span>

          <span className="font-medium text-green-600">
            - {formatAmount(discount)}
          </span>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-gray-500">
            Shipping
          </span>

          <span className="font-medium text-gray-800">
            FREE
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-[#0B1F3A]">
              Grand Total
            </span>

            <span className="text-lg font-bold text-[#F97316]">
              {formatAmount(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Coupon */}
      {/* <div className="mt-5 rounded-lg bg-orange-50 px-3 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            Coupon Applied
          </span>

          <span className="rounded-md bg-white px-2 py-1 font-mono text-xs font-semibold text-[#F97316]">
            WELCOME10
          </span>
        </div>
      </div> */}
    </section>
  );
}

export default OrderSummary;