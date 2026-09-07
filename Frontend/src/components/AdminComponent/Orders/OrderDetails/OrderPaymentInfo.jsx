import { CheckCircle2, CreditCard, CircleX, Clock3, Ban, Hash } from "lucide-react";

function OrderPaymentInfo({ paymentMethod, paymentStatus }) {
  const paymentStatusConfig = {
    Pending: {
      bgClass: "bg-amber-50",
      icon: Clock3,
      iconClass: "text-amber-600",
      textClass: "text-amber-700",
    },
    Paid: {
      bgClass: "bg-green-50",
      icon: CheckCircle2,
      iconClass: "text-green-600",
      textClass: "text-green-700",
    },
    Failed: {
      bgClass: "bg-red-50",
      icon: CircleX,
      iconClass: "text-red-600",
      textClass: "text-red-700",
    },
    Cancelled: {
      bgClass: "bg-gray-50",
      icon: Ban,
      iconClass: "text-gray-500",
      textClass: "text-gray-600",
    },
  };

  const config =
    paymentStatusConfig[paymentStatus] ||
    paymentStatusConfig.Pending;

  const StatusIcon = config.icon;

  
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
          <CreditCard size={18} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            Payment Information
          </h2>

          <p className="text-xs text-gray-500">
            Payment details for this order.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Payment Method */}
        <div className="rounded-lg bg-gray-50 p-3.5">
          <p className="text-xs text-gray-400">
            Payment Method
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            {paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod}
          </p>
        </div>

        {/* Payment Status */}
        {/* <div className="rounded-lg bg-green-50 p-3.5">
          <p className="text-xs text-gray-400">
            Payment Status
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <CheckCircle2
              size={15}
              className="text-green-600"
            />

            <span className="text-sm font-semibold text-green-700">
              { paymentStatus }
            </span>
          </div>
        </div> */}

        <div className={`rounded-lg p-3.5 ${config.bgClass}`}>
          <p className="text-xs text-gray-400">
            Payment Status
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <StatusIcon
              size={15}
              className={config.iconClass}
            />

            <span
              className={`text-sm font-semibold ${config.textClass}`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>

        {/* Transaction ID */}
        {/* <div className="rounded-lg bg-gray-50 p-3.5">
          <p className="text-xs text-gray-400">
            Transaction ID
          </p>

          <div className="mt-1 flex items-center gap-1.5">
            <Hash size={14} className="text-gray-400" />

            <span className="truncate text-sm font-semibold text-gray-800">
              TXN-82938472
            </span>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default OrderPaymentInfo;