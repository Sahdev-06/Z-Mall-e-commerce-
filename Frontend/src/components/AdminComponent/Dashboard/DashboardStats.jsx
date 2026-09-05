import {
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

const statConfig = [
  {
    key: "totalRevenue",
    title: "Total Revenue",
    icon: IndianRupee,
    iconClass: "bg-green-50 text-green-600",
    isCurrency: true,
  },
  {
    key: "totalOrders",
    title: "Total Orders",
    icon: ShoppingCart,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    key: "totalUsers",
    title: "Total Users",
    icon: Users,
    iconClass: "bg-purple-50 text-purple-600",
  },
  {
    key: "totalProducts",
    title: "Total Products",
    icon: Package,
    iconClass: "bg-orange-50 text-orange-600",
  },
];

function DashboardStats({ stats }) {
  const formatValue = (value, isCurrency = false) => {
    const formattedValue = Number(value || 0).toLocaleString("en-IN");

    return isCurrency ? `₹${formattedValue}` : formattedValue;
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statConfig.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-[#0B1F3A]">
                  {formatValue(stats?.[stat.key], stat.isCurrency)}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconClass}`}
              >
                <Icon size={19} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardStats;