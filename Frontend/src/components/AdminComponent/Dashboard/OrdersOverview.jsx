import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

const orderStatusConfig = [
  {
    key: "pending",
    label: "Pending",
    icon: Clock3,
    iconClass: "bg-amber-50 text-amber-600",
    barClass: "bg-amber-500",
  },
  {
    key: "confirmed",
    label: "Confirmed",
    icon: CheckCircle2,
    iconClass: "bg-blue-50 text-blue-600",
    barClass: "bg-blue-500",
  },
  {
    key: "processing",
    label: "Processing",
    icon: PackageOpen,
    iconClass: "bg-purple-50 text-purple-600",
    barClass: "bg-purple-500",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: Truck,
    iconClass: "bg-indigo-50 text-indigo-600",
    barClass: "bg-indigo-500",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: PackageCheck,
    iconClass: "bg-green-50 text-green-600",
    barClass: "bg-green-500",
  },
  {
    key: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    iconClass: "bg-red-50 text-red-600",
    barClass: "bg-red-500",
  },
];

function OrdersOverview({ totalOrders, orderStatus }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Orders Overview
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          Current order distribution by status.
        </p>
      </div>

      <div className="space-y-4">
        {orderStatusConfig.map((status) => {
          const Icon = status.icon;
          const count = orderStatus?.[status.key] ?? 0;

          const percentage =
            totalOrders > 0
              ? Math.round((count / totalOrders) * 100)
              : 0;

          return (
            <div key={status.key}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${status.iconClass}`}
                  >
                    <Icon size={15} />
                  </div>

                  <span className="truncate text-sm font-medium text-gray-700">
                    {status.label}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    {count}
                  </span>

                  <span className="text-xs text-gray-400">
                    {percentage}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${status.barClass}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default OrdersOverview;