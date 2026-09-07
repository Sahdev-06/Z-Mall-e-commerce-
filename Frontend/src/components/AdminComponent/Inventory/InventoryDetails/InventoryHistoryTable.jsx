import {
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";


function InventoryHistoryTable({ inventory }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Inventory History
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          All stock changes for this product.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Change Stock
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Type
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Reason
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {inventory.map(({ _id, type, reason, changedStock, createdAt }) => {

              return (
                <tr
                  key={_id}
                  className="transition-colors hover:bg-gray-50/70"
                >
                  {/* Change Stock */}
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        type === "IN"
                          ? "bg-green-50 text-green-700"
                          : type === "OUT"
                            ? "bg-red-50 text-red-700"
                            : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {type === "IN" ? (
                        <ArrowUp size={13} />
                      ) : type === "OUT" ? (
                        <ArrowDown size={13} />
                      ) : (
                        <Minus size={13} />
                      )}

                      {type === "IN" ? "+" : "-"}
                      {changedStock}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium 
                        ${type === "IN" ? "bg-[#E6F4FF] text-[#1677C8]" : "bg-[#F5F0FF] text-[#6941C6]"}`}
                    >
                      {type}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {reason}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-gray-700">
                        {formatDate(createdAt)}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {formatDateTime(createdAt)}
                      </p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center 
                      sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {inventory.length}
          </span>{" "}
          inventory changes
        </p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-300"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#0B1F3A] px-3 py-2 text-xs font-medium text-white"
          >
            1
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
                      transition hover:bg-gray-50"
          >
            2
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 
                      transition hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default InventoryHistoryTable;