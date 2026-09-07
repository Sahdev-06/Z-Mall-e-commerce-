import { Download } from "lucide-react";

function InventoryPageHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Inventory
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View stock changes and inventory activity for your products.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-[#0B1F3A] focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/10 sm:w-auto"
        >
          <Download size={17} />
          Export
        </button>
      </div>
    </div>
  );
}

export default InventoryPageHeader;