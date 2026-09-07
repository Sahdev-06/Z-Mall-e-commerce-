import {
  AlertTriangle,
  ArrowRight,
  Package,
} from "lucide-react";

const lowStockProducts = [
  {
    id: 1,
    name: "Premium Running Shoes",
    stock: 8,
    status: "Low Stock",
  },
  {
    id: 2,
    name: "Smart Watch",
    stock: 5,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    stock: 2,
    status: "Low Stock",
  },
  {
    id: 4,
    name: "Classic Cotton T-Shirt",
    stock: 0,
    status: "Out of Stock",
  },
];

function LowStockProducts() {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            Low Stock Products
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Products that need attention.
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
          <AlertTriangle size={17} />
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {lowStockProducts.map((product) => {
          const isOutOfStock = product.stock === 0;

          return (
            <div
              key={product.id}
              className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50/70 sm:px-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                <Package size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-800">
                  {product.name}
                </p>

                <p
                  className={`mt-1 text-xs font-medium ${
                    isOutOfStock
                      ? "text-red-600"
                      : "text-orange-600"
                  }`}
                >
                  {isOutOfStock
                    ? "Out of stock"
                    : `${product.stock} units remaining`}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  isOutOfStock
                    ? "bg-red-50 text-red-700"
                    : "bg-orange-50 text-orange-700"
                }`}
              >
                {product.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] transition-colors hover:text-[#F97316]"
        >
          View Inventory
          <ArrowRight size={14} />
        </button>
      </div>
    </section>
  );
}

export default LowStockProducts;