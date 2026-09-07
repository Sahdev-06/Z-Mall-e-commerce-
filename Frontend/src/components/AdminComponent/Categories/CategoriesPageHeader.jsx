import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoriesPageHeader() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Page Info */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Categories
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage product categories and organize your store.
          </p>
        </div>

        {/* Add Category */}
        <button
          type="button"
          onClick={() => navigate("/admin/categories/new")}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#F97316] 
                    px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#EA580C] 
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:ring-offset-2 sm:w-auto"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span>Add Category</span>
        </button>
      </div>
    </div>
  );
}

export default CategoriesPageHeader;