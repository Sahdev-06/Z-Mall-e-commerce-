import { RotateCcw, Search } from "lucide-react";

function InventoryToolbar() {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={19}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search product..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <select
            defaultValue="all"
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10 sm:w-40"
          >
            <option value="all">All Types</option>
            <option value="order">Order</option>
            <option value="restock">Restock</option>
            <option value="return">Return</option>
            <option value="adjustment">Adjustment</option>
          </select>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-[#0B1F3A]"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryToolbar;