import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CouponsPageHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Coupons
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage discount coupons for your store.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/coupons/new")}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:ring-offset-2 sm:w-auto"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Coupon</span>
        </button>
      </div>
    </div>
  );
}

export default CouponsPageHeader;