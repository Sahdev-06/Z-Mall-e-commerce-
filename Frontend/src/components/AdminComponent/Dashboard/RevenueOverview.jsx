import { BarChart3 } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 45000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 61000 },
  { month: "Jun", revenue: 48500 },
];

function RevenueOverview() {
  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.revenue)
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
            <BarChart3 size={18} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[#0B1F3A]">
              Revenue Overview
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Revenue performance over the last 6 months.
            </p>
          </div>
        </div>

        <select
          defaultValue="6months"
          className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-600 outline-none focus:border-[#0B1F3A]"
        >
          <option value="6months">Last 6 Months</option>
          <option value="12months">Last 12 Months</option>
          <option value="year">This Year</option>
        </select>
      </div>

      <div className="relative">
        <div className="flex h-64 gap-4">
          {/* Y Axis */}
          <div className="flex flex-col justify-between pb-6 text-right">
            <span className="text-[11px] text-gray-400">
              ₹60k
            </span>

            <span className="text-[11px] text-gray-400">
              ₹45k
            </span>

            <span className="text-[11px] text-gray-400">
              ₹30k
            </span>

            <span className="text-[11px] text-gray-400">
              ₹15k
            </span>

            <span className="text-[11px] text-gray-400">
              ₹0
            </span>
          </div>

          {/* Chart */}
          <div className="relative flex flex-1 items-end gap-3 border-b border-gray-200 sm:gap-5">
            {/* Grid Lines */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full">
              <div className="absolute left-0 right-0 top-0 border-t border-dashed border-gray-100" />
              <div className="absolute left-0 right-0 top-1/4 border-t border-dashed border-gray-100" />
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-gray-100" />
              <div className="absolute left-0 right-0 top-3/4 border-t border-dashed border-gray-100" />
            </div>

            {revenueData.map((item) => {
              const height = `${(item.revenue / maxRevenue) * 100}%`;

              return (
                <div
                  key={item.month}
                  className="relative z-10 flex h-full flex-1 flex-col justify-end"
                >
                  <div className="group relative flex h-full items-end justify-center">
                    <div
                      style={{ height }}
                      className="w-full max-w-10 rounded-t-md bg-[#0B1F3A] transition-all duration-300 group-hover:bg-[#F97316]"
                    >
                      <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[#0B1F3A] px-2 py-1 text-[10px] font-medium text-white group-hover:block">
                        ₹{(item.revenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>

                  <span className="mt-2 text-center text-[11px] text-gray-400">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RevenueOverview;