import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SubCategoryFormHeader({ mode }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Sub-categories
      </button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          {mode === "edit" ? "Edit Sub-category" : "Add Sub-category"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {
            mode === "edit"
            ? "Edit existing sub-category under a category."
            : "Create a new sub-category under a category."
          }
        </p>
      </div>
    </div>
  );
}

export default SubCategoryFormHeader;