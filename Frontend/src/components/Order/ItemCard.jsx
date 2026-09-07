import { Package } from "lucide-react";

function ItemCard({ productImage, productName, price, quantity }) {
    return (
        <div className="flex items-center gap-3 py-3 sm:gap-4">
            {/* Image */}
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-20 sm:w-20">
                {productImage ? (
                    <img
                        src={productImage}
                        alt={productName}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-6 w-6 text-slate-400" />
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-slate-900 sm:text-base">
                    {productName}
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Quantity: {quantity}
                </p>
            </div>

            {/* Price */}
            <p className="shrink-0 text-sm font-semibold text-slate-900 sm:text-base">
                ₹{price.toLocaleString("en-IN")}
            </p>
        </div>
    );
}

export default ItemCard;
