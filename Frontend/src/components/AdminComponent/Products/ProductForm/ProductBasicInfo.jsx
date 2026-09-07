

function ProductBasicInfo({ name, description, onChange, errors }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Basic Information
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Add the basic details of your product.
        </p>
      </div>

      <div className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="product-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Product Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="product-name"
            name="name"
            value={name}
            onChange={onChange}
            type="text"
            placeholder="Enter product name"
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          {errors.name && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="product-description"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Description
            <span className="ml-1 text-red-500">*</span>
          </label>

          <textarea
            id="product-description"
            name="description"
            value={description}
            onChange={onChange}
            rows={5}
            placeholder="Describe your product..."
            className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Provide a clear and detailed description of the product.
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

export default ProductBasicInfo;

