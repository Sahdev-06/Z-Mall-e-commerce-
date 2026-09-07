import { Package } from "lucide-react";


function OrderItems({ orderItems }) {
  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
          <Package size={18} />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#0B1F3A]">
            Ordered Items
          </h2>

          <p className="text-xs text-gray-500">
            {orderItems.length} items in this order
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100">
        {orderItems.map(({ _id, productName, productImage, price, quantity }) => (
          <div
            key={_id}
            className="flex gap-4 px-4 py-4 sm:px-6"
          >
            {/* Product Image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:h-20 sm:w-20">
              <img
                src={productImage}
                alt={productName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-gray-800">
                {productName}
              </h3>

              {/* <p className="mt-1 text-xs text-gray-400">
                {item.variant}
              </p> */}

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="text-xs text-gray-500">
                  Qty:{" "}
                  <span className="font-medium text-gray-700">
                    {quantity}
                  </span>
                </span>

                <span className="text-xs text-gray-500">
                  Price:{" "}
                  <span className="font-medium text-gray-700">
                    {formatAmount(price)}
                  </span>
                </span>
              </div>
            </div>

            {/* Subtotal */}
            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-gray-900">
                {formatAmount(price * quantity)}
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Subtotal
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderItems;