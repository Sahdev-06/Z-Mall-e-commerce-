import { CalendarDays } from "lucide-react";

function CouponExpiryDate({ isActive, onChange, expiryDate, errors }) {
  return (
    // <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
    //   <div className="mb-5">
    //     <h2 className="text-base font-semibold text-[#0B1F3A]">
    //       Coupon Validity
    //     </h2>

    //     <p className="mt-1 text-xs text-gray-500">
    //       Set the date when this coupon will expire.
    //     </p>
    //   </div>

    //   <div className="max-w-md">
    //     <label
    //       htmlFor="coupon-expiry-date"
    //       className="mb-2 block text-sm font-medium text-gray-700"
    //     >
    //       Expiry Date
    //       <span className="ml-1 text-red-500">*</span>
    //     </label>

    //     <div className="relative">
    //       <CalendarDays
    //         size={18}
    //         className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    //       />

    //       <input
    //         id="coupon-expiry-date"
    //         type="date"
    //         className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3.5 text-sm text-gray-700 outline-none transition focus:border-[#0B1F3A] focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
    //       />
    //     </div>

    //     <p className="mt-1.5 text-xs text-gray-400">
    //       The coupon will no longer be valid after this date.
    //     </p>
    //   </div>
    // </section>

    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Coupon Validity
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Set the date when this coupon will expire.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="max-w-md">
          <label
            htmlFor="coupon-expiry-date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Expiry Date
            <span className="ml-1 text-red-500">*</span>
          </label>

          <div className="relative">
            <CalendarDays
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              id="coupon-expiry-date"
              name="expiryDate"
              value={expiryDate}
              onChange={onChange}
              type="date"
              className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-3.5 text-sm 
                        text-gray-700 outline-none transition focus:border-[#0B1F3A] focus:bg-white 
                        focus:ring-2 focus:ring-[#0B1F3A]/10"
            />
          </div>

          <p className="mt-1.5 text-xs text-gray-400">
            The coupon will no longer be valid after this date.
          </p>

          {errors.expiryDate && (
            <p className="mt-1.5 text-xs text-red-500">
              { errors.expiryDate }
            </p>
          )}
        </div>

        <div className="max-w-md">
          <label
            htmlFor="coupon-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Status
            <span className="ml-1 text-red-500">*</span>
          </label>

          <select
            id="coupon-status"
            name="isActive"
            value={isActive}
            onChange={onChange}
            className="h-11 w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-700 
                      outline-none transition focus:border-[#0B1F3A] focus:bg-white focus:ring-2 
                      focus:ring-[#0B1F3A]/10"
          >
            <option value="" disabled>Select Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <p className="mt-1.5 text-xs text-gray-400">
            Set the current status of this coupon.
          </p>
        </div>
      </div>
    </section>

  );
}

export default CouponExpiryDate;