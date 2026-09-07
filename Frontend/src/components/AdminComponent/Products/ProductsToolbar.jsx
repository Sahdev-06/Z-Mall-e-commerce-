import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

function ProductsToolbar({
  categories,
  search,
  setSearch,
  onSearch,
  category,
  setCategory,
  onCategoryChange,
  onReset
}) {
  return (
    <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        {/* <div className="relative w-full lg:max-w-md">
          <Search
            size={19}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />
        </div> */}

        <div className="flex w-full flex-col gap-2 sm:flex-row lg:max-w-xl">
          <div className="relative w-full">
            <Search
              size={19}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID or customer..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm 
              text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] 
              focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
            />
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={onSearch}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] 
                      px-5 text-sm font-medium text-white transition hover:bg-[#102B52] focus:outline-none 
                      focus:ring-2 focus:ring-[#0B1F3A]/20 active:scale-[0.98] sm:w-auto"
          >
            <Search size={16} />
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Category */}
          <select
            onChange={(e) => {
              setCategory(e.target.value)
              onCategoryChange
            }}
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10 sm:w-44"
            defaultValue=""
          >
            <option value="">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category._id}
                value={category._id}
              >
                { category.name }
              </option>
            ))}
          </select>

          {/* Stock */}
          {/* <select
            className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-600 outline-none transition focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10 sm:w-40"
            defaultValue=""
          >
            <option value="" disabled>
              Stock Status
            </option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select> */}

          {/* Filter Button */}
          {/* <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm font-medium text-gray-600 transition hover:border-[#0B1F3A] hover:bg-gray-50 hover:text-[#0B1F3A]"
          >
            <SlidersHorizontal size={17} />
            <span>Filters</span>
          </button> */}

          {/* Reset */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-[#0B1F3A]"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsToolbar;

