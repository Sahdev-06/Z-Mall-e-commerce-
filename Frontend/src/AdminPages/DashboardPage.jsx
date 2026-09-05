import DashboardHeader from "../components/AdminComponent/Dashboard/DashboardHeader";
import DashboardStats from "../components/AdminComponent/Dashboard/DashboardStats";
import RevenueOverview from "../components/AdminComponent/Dashboard/RevenueOverview";
import OrdersOverview from "../components/AdminComponent/Dashboard/OrdersOverview";
import RecentOrders from "../components/AdminComponent/Dashboard/RecentOrders";
import LowStockProducts from "../components/AdminComponent/Dashboard/LowStockProducts";
import { getDashboardStats } from "../services/dashboardService";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader"
import { useState, useEffect } from "react";

function DashboardPage() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats()
        setStats(result.data)
        setRecentOrders(result.data.recentOrders)
        console.log(result.data.recentOrders)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <DashboardHeader />

      <div className="space-y-5">
        <DashboardStats 
          stats={stats}
        />

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* <div className="xl:col-span-2">
            <RevenueOverview />
          </div> */}

          <div className="xl:col-span-2">
            <RecentOrders 
              recentOrders={recentOrders}
            />
          </div>

          <OrdersOverview 
            totalOrders={stats.totalOrders}
            orderStatus={stats.orderStatus}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* <div className="xl:col-span-2">
            <RecentOrders 
              recentOrders={recentOrders}
            />
          </div> */}

          {/* <LowStockProducts /> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;