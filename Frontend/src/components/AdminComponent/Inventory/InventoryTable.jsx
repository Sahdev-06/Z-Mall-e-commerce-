import { Eye, Package } from "lucide-react";

const inventory = [
  {
    id: 1,
    product: "Wireless Bluetooth Headphones",
    currentStock: 24,
    status: "In Stock",
  },
  {
    id: 2,
    product: "Premium Running Shoes",
    currentStock: 8,
    status: "Low Stock",
  },
  {
    id: 3,
    product: "Classic Cotton T-Shirt",
    currentStock: 0,
    status: "Out of Stock",
  },
  {
    id: 4,
    product: "Leather Wallet",
    currentStock: 32,
    status: "In Stock",
  },
  {
    id: 5,
    product: "Smart Watch",
    currentStock: 5,
    status: "Low Stock",
  },
];

const statusStyles = {
  "In Stock": "bg-green-50 text-green-700",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out of Stock": "bg-red-50 text-red-700",
};

function InventoryTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Product Inventory
        </h2>

        <p className="mt-0.5 text-xs text-gray-500">
          View inventory status and stock history for each product.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Product
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current Stock
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {inventory.map((item) => (
              <tr
                key={item.id}
                className="transition-colors hover:bg-gray-50/70"
              >
                {/* Product */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
                      <Package size={18} />
                    </div>

                    <span className="text-sm font-semibold text-gray-800">
                      {item.product}
                    </span>
                  </div>
                </td>

                {/* Current Stock */}
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-800">
                    {item.currentStock}
                  </span>
                  <span className="ml-1 text-xs text-gray-400">
                    units
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Action */}
                <td className="px-6 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex h-9 items-center gap-2 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition-colors hover:border-[#0B1F3A] hover:bg-[#0B1F3A] hover:text-white"
                    >
                      <Eye size={15} />
                      View History
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-700">
            1
          </span>{" "}
          to{" "}
          <span className="font-medium text-gray-700">
            {inventory.length}
          </span>{" "}
          products
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
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
          >
            2
          </button>

          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryTable;