import { ChevronDown } from "lucide-react";

function SubCategoryCategory({ categories, category, onChange, errors }) {

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Category
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Select the parent category for this sub-category.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="parent-category"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Parent Category
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="relative">
          <select
            id="parent-category"
            name="category"
            value={category}
            onChange={onChange}
            defaultValue=""
            className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 
                      pr-10 text-sm text-gray-700 outline-none transition focus:border-[#0B1F3A] 
                      focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          >
            <option value="" disabled>
              Select category
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <ChevronDown
            size={17}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {errors.category && (
          <p className="mt-1.5 text-xs text-red-500">
            { errors.category }
          </p>
        )}
      </div>
    </section>
  );
}

export default SubCategoryCategory;