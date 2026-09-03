import {
  CalendarDays,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function CouponsTable(
  { coupons, 
    setIsModalOpen, 
    setSelectedCoupon,
    currentPage,
    setCurrentPage,
    totalPages,
    totalCoupons,
    limit
  }
) {
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

  const start = coupons.length === 0
    ? 0
    : (currentPage - 1) * limit + 1;

  const end = (currentPage - 1) * limit + coupons.length;


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            All Coupons
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            {coupons.length} coupons found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Code
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Discount
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Discount Type
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Minimum Order
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Expiry Date
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {coupons.map(({ _id, code, discount, discountType, expiryDate, isActive, minimumOrderAmount}) => (
              <tr
                key={_id}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* Code */}
                <td className="px-6 py-4">
                  <div>
                    <span className="inline-flex rounded-md border border-orange-200 bg-orange-50 px-2.5 
                                    py-1 font-mono text-sm font-semibold tracking-wide text-[#F97316]">
                      {code}
                    </span>

                    {/* <p className="mt-1 text-xs text-gray-400">
                      ID: #{coupon.id.toString().padStart(4, "0")}
                    </p> */}
                  </div>
                </td>

                {/* Discount */}
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900">
                    {discountType === "Percentage"
                      ? `${discount}%`
                      : formatAmount(discount)}
                  </span>
                </td>

                {/* Discount Type */}
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium 
                                text-gray-600">
                    {discountType}
                  </span>
                </td>

                {/* Minimum Order */}
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-700">
                    {formatAmount(minimumOrderAmount)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  {isActive === true ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 
                            px-2.5 py-1 text-xs font-medium text-green-700">
                      <CheckCircle2 size={13} />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5
                             py-1 text-xs font-medium text-gray-600">
                      <XCircle size={13} />
                      Inactive
                    </span>
                  )}
                </td>

                {/* Expiry Date */}
                <td className="px-6 py-4">
                  <div className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <CalendarDays size={15} className="text-gray-400" />
                    {formatDate(expiryDate)}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/coupons/${_id}/edit`)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-blue-50 hover:text-[#0B1F3A]"
                      aria-label={`Edit ${code}`}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(true)
                        setSelectedCoupon({ _id, code })
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 
                                  transition hover:bg-red-50 hover:text-red-600"
                      aria-label={`Delete ${code}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
            {totalCoupons}
          </span>{" "}
          coupons
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
                      transition hover:bg-gray-50"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-xs font-medium text-white"
          >
            {currentPage}
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
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

export default CouponsTable;