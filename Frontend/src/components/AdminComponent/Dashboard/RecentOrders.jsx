import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom"

const statusConfig = {
  Pending: {
    icon: Clock3,
    className: "bg-amber-50 text-amber-700",
  },
  Confirmed: {
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700",
  },
  Processing: {
    icon: PackageOpen,
    className: "bg-purple-50 text-purple-700",
  },
  Shipped: {
    icon: Truck,
    className: "bg-indigo-50 text-indigo-700",
  },
  Delivered: {
    icon: PackageCheck,
    className: "bg-green-50 text-green-700",
  },
  Cancelled: {
    icon: XCircle,
    className: "bg-red-50 text-red-700",
  },
};

function RecentOrders({ recentOrders }) {
  const navigate = useNavigate();

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            Recent Orders
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Latest orders placed by customers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/orders")}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B1F3A] transition-colors hover:text-[#F97316]"
        >
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/70">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Customer
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Items
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Amount
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {recentOrders?.map((order) => {
              const status = order.orderStatus;
              const statusData = statusConfig[status];

              const StatusIcon = statusData?.icon;

              const customerName =
                order.shippingAddress?.fullName || "-";

              const itemCount = order.orderItems?.length || 0;

              return (
                <tr
                  key={order._id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">
                      {customerName}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-700">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800">
                      {formatAmount(order.totalAmount)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {statusData ? (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusData.className}`}
                      >
                        <StatusIcon size={13} />
                        {status}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">
                        {status || "-"}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default RecentOrders;
