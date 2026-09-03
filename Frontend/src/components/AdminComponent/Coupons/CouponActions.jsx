import { useState } from "react";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";

function CouponActions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/10"
        aria-label="Coupon actions"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-20 w-40 rounded-lg border border-gray-200 bg-white p-1.5 shadow-lg">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#0B1F3A]"
          >
            <Eye size={16} />
            View
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#0B1F3A]"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default CouponActions;
