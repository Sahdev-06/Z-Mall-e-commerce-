import { Check, ChevronDown } from "lucide-react";

function SubCategoryStatus() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Control whether this sub-category is available in your store.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="sub-category-status"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Sub-category Status
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="relative">
          <select
            id="sub-category-status"
            defaultValue="active"
            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-xs text-green-700">
          <Check size={15} />
          <span>
            Active sub-categories will be available for products.
          </span>
        </div>
      </div>
    </section>
  );
}

export default SubCategoryStatus;