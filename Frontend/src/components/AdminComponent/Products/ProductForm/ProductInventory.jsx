import { ChevronDown } from "lucide-react";

function ProductInventory({ stock, isActive, onChange }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Inventory & Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Manage product stock and availability.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Stock */}
        <div>
          <label
            htmlFor="product-stock"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Stock
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="product-stock"
            name="stock"
            value={stock}
            onChange={onChange}
            type="number"
            min="0"
            placeholder="Enter stock quantity"
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Enter the available quantity.
          </p>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="product-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <select
              id="product-status"
              name="isActive"
              value={isActive}
              onChange={onChange}
              defaultValue="active"
              className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInventory;