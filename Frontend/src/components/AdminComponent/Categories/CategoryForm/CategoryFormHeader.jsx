import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CategoryFormHeader({ mode }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Categories
      </button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          {mode === "edit" ? "Edit Category" : "Add Category"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {mode === "edit" 
            ? "Edit existing category for your products."
            : "Create a new category for your products."
          }
        </p>
      </div>
    </div>
  );
}

export default CategoryFormHeader;