import { Download } from "lucide-react";

function OrdersPageHeader() {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and track their status.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrdersPageHeader;