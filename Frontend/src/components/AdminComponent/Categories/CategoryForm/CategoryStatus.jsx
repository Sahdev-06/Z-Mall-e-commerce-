import { Check, ChevronDown } from "lucide-react";

function CategoryStatus({ status, onChange }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Status
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Control whether this category is available in your store.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="category-status"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Category Status
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="relative">
          <select
            id="category-status"
            name="isActive"
            value={status}
            onChange={onChange}
            defaultValue="active"
            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 
                      px-3.5 pr-10 text-sm text-gray-700 outline-none transition 
                      focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2.5 text-xs text-green-700">
          <Check size={15} />
          <span>
            Active categories will be available for products.
          </span>
        </div>
      </div>
    </section>
  );
}

export default CategoryStatus;