import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProductFormHeader({ mode }) {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 
                    transition-colors hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Products
      </button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
          {mode === "edit" ? "Edit Product" : "Add Product"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {mode === "edit" ? "Edit existing product to your store." : "Add a new product to your store."}
        </p>
      </div>
    </div>
  );
}

export default ProductFormHeader;

