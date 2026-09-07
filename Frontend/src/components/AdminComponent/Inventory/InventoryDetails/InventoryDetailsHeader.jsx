import { ArrowLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

function InventoryDetailsHeader({ name }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate("/admin/products")}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors 
                    hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Inventory
      </button>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0B1F3A]">
            <Package size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
              { name }
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Inventory history
            </p>
          </div>
        </div>

        {/* <div className="flex items-center gap-3">
          <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-gray-400">
              Current Stock
            </p>

            <p className="mt-1 text-lg font-bold text-[#0B1F3A]">
              24
              <span className="ml-1 text-xs font-medium text-gray-400">
                units
              </span>
            </p>
          </div>

          <span className="inline-flex h-fit rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
            In Stock
          </span>
        </div> */}
      </div>
    </div>
  );
}

export default InventoryDetailsHeader;