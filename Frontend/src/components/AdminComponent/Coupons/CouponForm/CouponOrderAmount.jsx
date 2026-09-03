function CouponOrderAmount({ minimumOrderAmount, onChange, errors }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Order Requirement
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Set the minimum order amount required to use this coupon.
        </p>
      </div>

      <div className="max-w-md">
        <label
          htmlFor="minimum-order-amount"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Minimum Order Amount
          <span className="ml-1 text-red-500">*</span>
        </label>

        <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 focus-within:border-[#0B1F3A] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B1F3A]/10">
          <span className="flex items-center border-r border-gray-200 px-3 text-sm font-medium text-gray-500">
            ₹
          </span>

          <input
            id="minimum-order-amount"
            name="minimumOrderAmount"
            value={minimumOrderAmount}
            onChange={onChange}
            type="number"
            min="0"
            placeholder="Enter minimum amount"
            className="min-w-0 flex-1 bg-transparent px-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>

        <p className="mt-1.5 text-xs text-gray-400">
          Example: ₹999 means the coupon can only be used on orders of ₹999 or more.
        </p>

        {errors.minimumOrderAmount && (
          <p className="mt-1.5 text-xs text-red-500">
            { errors.minimumOrderAmount }
          </p>
        )}
      </div>
    </section>
  );
}

export default CouponOrderAmount;