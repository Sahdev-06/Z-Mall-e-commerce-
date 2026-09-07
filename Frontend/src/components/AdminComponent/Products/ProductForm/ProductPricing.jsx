
function ProductPricing({ price, discount, onChange, errors, mode }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Pricing
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Set the product price and discount.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Price */}
        <div>
          <label
            htmlFor="product-price"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Price
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
              ₹
            </span>

            <input
              id="product-price"
              name="price"
              value={price}
              onChange={onChange}
              type="number"
              min="0"
              placeholder="0.00"
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
            />
          </div>

          {errors.price && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.price}
            </p>
          )}
        </div>

        {/* Discount */}
        {mode === "add" && (
          <div>
            <label
              htmlFor="product-discount"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Discount
            </label>

            <div className="relative">
              <input
                id="product-discount"
                name="discount"
                value={discount}
                onChange={onChange}
                type="number"
                min="0"
                max="100"
                placeholder="0"
                className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 pr-10 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
              />

              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                %
              </span>
            </div>

            <p className="mt-1.5 text-xs text-gray-400">
              Enter a discount between 0% and 100%.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductPricing;

