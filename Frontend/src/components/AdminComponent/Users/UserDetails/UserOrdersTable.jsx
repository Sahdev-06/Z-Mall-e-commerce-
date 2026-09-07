import {
  CheckCircle2,
  Clock3,
  Eye,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

const orders = [
  {
    id: "ORD-1001",
    items: 3,
    total: 3499,
    status: "Delivered",
    date: "22 Aug 2026",
  },
  {
    id: "ORD-0987",
    items: 2,
    total: 2199,
    status: "Shipped",
    date: "15 Aug 2026",
  },
  {
    id: "ORD-0964",
    items: 1,
    total: 1299,
    status: "Delivered",
    date: "07 Aug 2026",
  },
  {
    id: "ORD-0942",
    items: 4,
    total: 5899,
    status: "Processing",
    date: "29 Jul 2026",
  },
  {
    id: "ORD-0918",
    items: 2,
    total: 1799,
    status: "Cancelled",
    date: "21 Jul 2026",
  },
];

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

function UserOrdersTable() {
  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Recent Orders
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          Recent orders placed by this customer.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Order ID
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Items
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Total
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon;

              return (
                <tr
                  key={order.id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-[#0B1F3A]">
                      {order.id}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {order.items}{" "}
                      {order.items === 1 ? "item" : "items"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800">
                      {formatAmount(order.total)}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig[order.status].className}`}
                    >
                      <StatusIcon size={13} />
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {order.date}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition-colors hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </div>
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

export default UserOrdersTable;