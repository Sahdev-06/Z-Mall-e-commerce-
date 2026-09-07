import {
    CalendarDays,
    ChevronRight,
    CircleCheck,
    Clock3,
    PackageCheck,
    XCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import ItemCard from "./ItemCard";

function OrderCard({
    orderId,
    orderItems,
    orderStatus,
    createdAt,
    showViewDetails,
    showCancelOrder,
    onCancel,
    cancelledAt,
    deliveredAt
}) {
    const navigate = useNavigate();
    const date = new Date(createdAt);

    const formatted = date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const cancelDate = new Date(cancelledAt)

    const cancelledDate = cancelDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const deliverDate = new Date(deliveredAt)

    const deliveredDate = deliverDate.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });


    const getStatusStyles = (status) => {
        switch (status) {
            case "Delivered":
                return {
                    className:
                        "bg-green-50 text-green-700 border-green-200",
                    icon: CircleCheck,
                };

            case "Shipped":
                return {
                    className:
                        "bg-blue-50 text-blue-700 border-blue-200",
                    icon: PackageCheck,
                };

            case "Processing":
                return {
                    className:
                        "bg-orange-50 text-orange-700 border-orange-200",
                    icon: Clock3,
                };

            case "Cancelled":
                return {
                    className:
                        "bg-red-50 text-red-700 border-red-200",
                    icon: XCircle,
                };

            case "Pending":
                return {
                    className:
                        "bg-orange-50 text-orange-700 border-orange-200",
                    icon: Clock3,
                };

            default:
                return {
                    className:
                        "bg-gray-50 text-gray-700 border-gray-200",
                    icon: Clock3,
                };
        }
    };

    const status = getStatusStyles(orderStatus);
    const StatusIcon = status.icon;

    return (
        <article
            className="
                w-full
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
            "
        >
            {/* Order Header */}
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    border-b
                    border-slate-200
                    p-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-5
                    sm:py-4
                "
            >
                {/* Order ID + Date */}
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                        Order #{orderId}
                    </p>

                    <div
                        className="
                            mt-1
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-1
                            text-xs
                            text-slate-500
                            sm:text-sm
                        "
                    >
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            Placed on {formatted}
                        </span>
                    </div>
                </div>

                {/* Status */}
                <div
                    className={`
                        inline-flex
                        w-fit
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${status.className}
                    `}
                >
                    <StatusIcon className="h-3.5 w-3.5" />

                    {orderStatus}
                </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-slate-100 px-4 sm:px-5">
                {orderItems.map(
                    ({
                        _id,
                        productImage,
                        productName,
                        price,
                        quantity,
                    }) => (
                        <ItemCard
                            key={_id}
                            productImage={productImage}
                            productName={productName}
                            price={price}
                            quantity={quantity}
                        />
                    )
                )}
            </div>

            {/* Footer */}
            <div
                className="
                    flex
                    flex-col
                    gap-3
                    border-t
                    border-slate-200
                    bg-slate-50/50
                    p-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    sm:px-5
                "
            >
                {/* Total Items */}
                <div>
                    <p className="text-xs text-slate-500">
                        Total items
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        {orderItems.length}
                    </p>
                </div>

                {/* View Details */}
                <div className="flex w-full sm:w-auto">
                    {showViewDetails && (
                        <button
                            type="button"
                            onClick={() => navigate(`/order-details/${orderId}`)}
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-orange-500
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                transition
                                hover:bg-slate-900

                                sm:w-auto
                            "
                        >
                            View Details

                            <ChevronRight className="h-4 w-4" />
                        </button>
                    )}

                    {/* {showCancelOrder && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="
                                inline-flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border
                                border-red-200
                                bg-white
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-red-600
                                transition
                                hover:bg-red-50

                                sm:w-auto
                            "
                        >
                            <XCircle className="h-4 w-4" />

                            Cancel Order
                        </button>
                    )} */}

                    {/* {showCancelOrder && (
                        orderStatus !== "Cancelled" ? (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="
                                    inline-flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-red-200
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition
                                    hover:bg-red-50
                                    sm:w-auto
                                "
                            >
                                <XCircle className="h-4 w-4" />
                                Cancel Order
                            </button>
                        ) : (
                            <span>
                                Cancelled on{" "}
                                <span className="font-semibold text-red-700">
                                    {cancelledDate}
                                </span>
                            </span>
                        )
                    )} */}

                    {showCancelOrder && (
                        orderStatus === "Cancelled" ? (
                            <span>
                                Cancelled on{" "}
                                <span className="font-semibold text-red-700">
                                    {cancelledDate}
                                </span>
                            </span>
                        ) : orderStatus === "Delivered" ? (
                            <span>
                                Delivered on{" "}
                                <span className="font-semibold text-green-700">
                                    {deliveredDate}
                                </span>
                            </span>
                        ) : (
                            <button
                                type="button"
                                onClick={onCancel}
                                className="
                                    inline-flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-red-200
                                    bg-white
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-medium
                                    text-red-600
                                    transition
                                    hover:bg-red-50
                                    sm:w-auto
                                "
                            >
                                <XCircle className="h-4 w-4" />
                                Cancel Order
                            </button>
                        )
                    )}

                </div>
            </div>
        </article>
    );
}

export default OrderCard;
