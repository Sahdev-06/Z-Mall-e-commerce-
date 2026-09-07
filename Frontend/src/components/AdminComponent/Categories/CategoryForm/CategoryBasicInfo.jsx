
function CategoryBasicInfo({ name, slug, descriptin, onChange, errors }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Basic Information
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Add the basic information for your category.
        </p>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label
            htmlFor="category-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Category Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="category-name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter category name"
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          {errors.name && (
              <p className="mt-1.5 text-xs text-red-500">
                  {errors.name}
              </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="category-slug"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Slug
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 focus-within:border-[#0B1F3A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B1F3A]/10">
            <span className="flex items-center border-r border-gray-200 px-3 text-sm text-gray-400">
              /
            </span>

            <input
              id="category-slug"
              type="text"
              name="slug"
              onChange={onChange}
              value={slug}
              placeholder="category-name"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-400">
            Use lowercase letters, numbers and hyphens only.
          </p>

          {errors.slug && (
              <p className="mt-1.5 text-xs text-red-500">
                  {errors.slug}
              </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="category-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="category-description"
            name="description"
            value={descriptin}
            onChange={onChange}
            rows={4}
            placeholder="Enter category description..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Keep the description short and informative.
          </p>

          {errors.description && (
              <p className="mt-1.5 text-xs text-red-500">
                  {errors.description}
              </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CategoryBasicInfo;