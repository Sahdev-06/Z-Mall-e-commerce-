import OrdersPageHeader from "../components/AdminComponent/Orders/OrdersPageHeader";
import OrdersToolbar from "../components/AdminComponent/Orders/OrdersToolbar";
import OrdersTable from "../components/AdminComponent/Orders/OrdersTable";
import { getAllOrders } from "../services/orderService";
import { useState, useEffect } from "react";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader"

function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalOrders, setTotalOrders] = useState(0)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  
  const limit = 40;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await getAllOrders(currentPage, limit, appliedSearch, status)
        setOrders(result.data.orders)
        setCurrentPage(result.data.currentPage)
        setTotalPages(result.data.totalPages)
        setTotalOrders(result.data.totalOrders)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [currentPage, appliedSearch, status])

  // handle reset filters and search
  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setStatus("");
    setCurrentPage(1);
  };

  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <OrdersPageHeader />

      <OrdersToolbar 
        search={search}
        setSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search)
          setCurrentPage(1)
        }}
        status={status}
        setStatus={setStatus}
        onStatusChange={() => {
          setCurrentPage(1);
        }}
        onReset={handleReset}
      />

      <OrdersTable 
        orders={orders}
        currentPage={currentPage}
        totalPages={totalPages}
        totalOrders={totalOrders}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </div>
  );
}

export default OrdersPage;