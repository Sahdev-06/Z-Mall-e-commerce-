import { ArrowLeft, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

function OrderDetailsHeader({ orderId, orderStatus, createdAt }) {
  const navigate = useNavigate();

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


  const orderStatusConfig = {
    Pending: {
      bgClass: "bg-amber-50",
      textClass: "text-amber-700",
    },
    Confirmed: {
      bgClass: "bg-blue-50",
      textClass: "text-blue-700",
    },
    Processing: {
      bgClass: "bg-purple-50",
      textClass: "text-purple-700",
    },
    Shipped: {
      bgClass: "bg-indigo-50",
      textClass: "text-indigo-700",
    },
    Delivered: {
      bgClass: "bg-green-50",
      textClass: "text-green-700",
    },
    Cancelled: {
      bgClass: "bg-red-50",
      textClass: "text-red-700",
    },
  };

  const statusConfig =
    orderStatusConfig[orderStatus] || {
      bgClass: "bg-gray-50",
      textClass: "text-gray-700",
    };

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => navigate("/admin/orders")}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors 
                  hover:text-[#0B1F3A]"
      >
        <ArrowLeft size={17} />
        Back to Orders
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#0B1F3A] sm:text-3xl">
              #ORD-{ orderId }
            </h1>

            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold 
                ${statusConfig.bgClass} ${statusConfig.textClass}`}
            >
              {orderStatus}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays size={16} />
            <span>{formatDateTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsHeader;