import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CouponFormActions({ isSubmitting, mode }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {/* Cancel */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border 
                  border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition-colors
                  hover:border-gray-300 hover:bg-gray-50 hover:text-[#0B1F3A] focus:outline-none 
                  focus:ring-2 focus:ring-[#0B1F3A]/10 sm:w-auto"
      >
        <X size={17} />
        Cancel
      </button>

      {/* Add Coupon */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] 
                    px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] 
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:ring-offset-2 sm:w-auto
                    disabled:bg-orange-300"
      >
        <Check size={17} strokeWidth={2.5} />
        {
          isSubmitting 
          ? `${mode === "edit" ? "Updating..." : "Creating..."}` 
          : `${mode === "edit" ? "Update Coupon" : "Add Coupon"}`
        }
      </button>
    </div>
  );
}

export default CouponFormActions;