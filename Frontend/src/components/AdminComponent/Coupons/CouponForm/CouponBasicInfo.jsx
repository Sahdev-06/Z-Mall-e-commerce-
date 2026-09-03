import { ChevronDown } from "lucide-react";

function CouponBasicInfo({ code, discount, discountType, onChange, errors }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Coupon Details
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Enter the basic details of your discount coupon.
        </p>
      </div>

      <div className="space-y-5">
        {/* Coupon Code */}
        <div>
          <label
            htmlFor="coupon-code"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Coupon Code
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            id="coupon-code"
            name="code"
            value={code}
            onChange={onChange}
            type="text"
            placeholder="e.g. WELCOME10"
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm font-medium 
                        uppercase tracking-wide text-gray-900 outline-none transition 
                        placeholder:normal-case placeholder:tracking-normal placeholder:text-gray-400 
                        focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
          />

          <p className="mt-1.5 text-xs text-gray-400">
            Use letters and numbers without spaces.
          </p>

          {errors.code && (
            <p className="mt-1.5 text-xs text-red-500">
              { errors.code }
            </p>
          )}
        </div>

        {/* Discount Fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Discount */}
          <div>
            <label
              htmlFor="coupon-discount"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Discount
              <span className="ml-1 text-red-500">*</span>
            </label>

            <input
              id="coupon-discount"
              name="discount"
              value={discount}
              onChange={onChange}
              type="number"
              min="0"
              placeholder="Enter discount"
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm 
                        text-gray-900 outline-none transition placeholder:text-gray-400 
                        focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
            />

            {errors.discount && (
              <p className="mt-1.5 text-xs text-red-500">
                { errors.discount }
              </p>
            )}
          </div>

          {/* Discount Type */}
          <div>
            <label
              htmlFor="discount-type"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Discount Type
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative">
              <select
                id="discount-type"
                name="discountType"
                value={discountType}
                onChange={onChange}
                defaultValue=""
                className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3.5 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
              >
                <option value="" disabled>
                  Select discount type
                </option>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed Amount</option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {errors.discountType && (
              <p className="mt-1.5 text-xs text-red-500">
                { errors.discountType }
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CouponBasicInfo;