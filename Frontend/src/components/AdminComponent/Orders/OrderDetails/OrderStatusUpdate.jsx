import {
  CheckCircle2,
  ChevronDown,
  Clock3,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

const statuses = [
  {
    value: "Pending",
    icon: Clock3,
    color: "text-amber-600",
  },
  {
    value: "Confirmed",
    icon: CheckCircle2,
    color: "text-blue-600",
  },
  {
    value: "Processing",
    icon: PackageOpen,
    color: "text-purple-600",
  },
  {
    value: "Shipped",
    icon: Truck,
    color: "text-indigo-600",
  },
  {
    value: "Delivered",
    icon: PackageCheck,
    color: "text-green-600",
  },
  {
    value: "Cancelled",
    icon: XCircle,
    color: "text-red-600",
  },
];

function OrderStatusUpdate({ onChange, currentStatus, handleUpdateStatus, orderStatus }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Update Order Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Change the current status of this order.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="order-status"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Order Status
        </label>

        <div className="relative">
          <select
            id="order-status"
            name="status"
            onChange={onChange}
            value={currentStatus}
            defaultValue="Delivered"
            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 
                      pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-[#0B1F3A] 
                      focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          >
            {statuses.map((status) => (
              <option 
                key={status.value} 
                value={status.value} 
                disabled={orderStatus === "Delivered" || currentStatus === "Cancelled"}
              >
                {status.value}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {statuses.map((status) => {
            const Icon = status.icon;

            return (
              <span
                key={status.value}
                className={`inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs 
                            font-medium ${status.color}`}
              >
                <Icon size={13} />
                {status.value}
              </span>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleUpdateStatus}
          disabled={orderStatus === "Delivered" || currentStatus === "Cancelled"}
          className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg bg-[#0B1F3A] 
                      px-5 text-sm font-semibold text-white transition-colors hover:bg-[#102B50] 
                      focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/20 focus:ring-offset-2 sm:w-auto
                      disabled:bg-slate-700"
        >
          Update Status
        </button>
      </div>
    </section>
  );
}

export default OrderStatusUpdate;