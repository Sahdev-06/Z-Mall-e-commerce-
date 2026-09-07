import {
  CheckCircle2,
  Clock3,
  PackageCheck,
  PackageOpen,
  Truck,
  XCircle,
} from "lucide-react";

const timeline = [
  {
    status: "Delivered",
    date: "22 Aug 2026",
    time: "04:35 PM",
    description: "Order delivered successfully.",
    icon: PackageCheck,
    active: true,
  },
  {
    status: "Shipped",
    date: "21 Aug 2026",
    time: "11:20 AM",
    description: "Order has been shipped.",
    icon: Truck,
    active: true,
  },
  {
    status: "Processing",
    date: "20 Aug 2026",
    time: "02:15 PM",
    description: "Order is being prepared.",
    icon: PackageOpen,
    active: true,
  },
  {
    status: "Confirmed",
    date: "20 Aug 2026",
    time: "10:45 AM",
    description: "Order has been confirmed.",
    icon: CheckCircle2,
    active: true,
  },
  {
    status: "Pending",
    date: "20 Aug 2026",
    time: "10:30 AM",
    description: "Order was placed successfully.",
    icon: Clock3,
    active: true,
  },
];

function OrderTimeline() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Order Timeline
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Track the status history of this order.
        </p>
      </div>

      <div className="relative">
        {timeline.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === timeline.length - 1;

          return (
            <div
              key={item.status}
              className="relative flex gap-4"
            >
              {/* Vertical Line */}
              {!isLast && (
                <div className="absolute left-[17px] top-9 h-[calc(100%-12px)] w-px bg-gray-200" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 ring-4 ring-white">
                <Icon size={17} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pb-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.status}
                  </h3>

                  <span className="text-xs text-gray-400">
                    {item.date} · {item.time}
                  </span>
                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cancelled status indicator */}
      <div className="mt-1 flex items-center gap-2 border-t border-gray-100 pt-4">
        <XCircle size={15} className="text-red-500" />

        <span className="text-xs text-gray-500">
          Cancelled orders will appear separately in the timeline.
        </span>
      </div>
    </section>
  );
}

export default OrderTimeline;
