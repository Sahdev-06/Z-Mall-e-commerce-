import {
  CheckCircle2,
  Clock3,
  Eye,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

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

function OrdersTable({ orders, currentPage, totalPages, totalOrders, setCurrentPage, limit }) {
  const navigate = useNavigate();

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const start = orders.length === 0
    ? 0
    : (currentPage - 1) * limit + 1;

  const end = (currentPage - 1) * limit + orders.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            All Orders
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {orders.length} orders found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Customer
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Items
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Total
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Payment
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
            {orders.map(({ _id, totalAmount, orderItems, orderStatus, paymentStatus, createdAt, 
              shippingAddress
            }) => {
              const StatusIcon = statusConfig[orderStatus].icon;

              return (
                <tr
                  key={_id}
                  className="transition-colors hover:bg-gray-50/70"
                >

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-700">
                      {shippingAddress.fullName}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {orderItems.length}{" "}
                      {orderItems.length ? "item" : "items"}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatAmount(totalAmount)}
                    </span>
                  </td>

                  {/* Payment */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        paymentStatus === "Paid"
                          ? "bg-green-50 text-green-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {paymentStatus}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs 
                                font-medium ${statusConfig[orderStatus].className}`}
                    >
                      <StatusIcon size={13} />
                      {orderStatus}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {formatDate(createdAt)}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/orders/${_id}/details`)}
                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 
                                    text-xs font-medium text-gray-600 transition-colors cursor-pointer
                                    hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white"
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

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center 
                      sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {start}
          </span>{" "}
          to{" "}
          <span className="font-medium text-gray-700">
            {end}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700">
            {totalOrders}
          </span>{" "}
          orders
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
                      transition hover:bg-gray-50"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-xs font-medium text-white"
          >
            { currentPage }
          </button>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
                      transition hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable;