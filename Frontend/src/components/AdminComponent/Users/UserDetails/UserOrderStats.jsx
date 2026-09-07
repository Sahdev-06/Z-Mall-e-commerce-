import { IndianRupee, Package, ShoppingBag } from "lucide-react";

function UserOrderStats() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Order Statistics
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Summary of this customer's orders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
              <ShoppingBag size={18} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Total
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-[#0B1F3A]">
            12
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Total Orders
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F97316]">
              <IndianRupee size={18} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Spent
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-[#0B1F3A]">
            ₹18,499
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Total Spent
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Package size={18} />
            </div>

            <span className="text-xs font-medium text-gray-400">
              Delivered
            </span>
          </div>

          <p className="mt-4 text-2xl font-bold text-[#0B1F3A]">
            10
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Delivered Orders
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserOrderStats;