import OrderDetailsHeader from "../components/AdminComponent/Orders/OrderDetails/OrderDetailsHeader";
import OrderStatusUpdate from "../components/AdminComponent/Orders/OrderDetails/OrderStatusUpdate";
import OrderCustomerInfo from "../components/AdminComponent/Orders/OrderDetails/OrderCustomerInfo";
import OrderItems from "../components/AdminComponent/Orders/OrderDetails/OrderItems";
import OrderSummary from "../components/AdminComponent/Orders/OrderDetails/OrderSummary";
import OrderPaymentInfo from "../components/AdminComponent/Orders/OrderDetails/OrderPaymentInfo";
import OrderTimeline from "../components/AdminComponent/Orders/OrderDetails/OrderTimeline";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader";
import { getOrderByIdForAdmin, updateOrderStatus } from "../services/orderService";
import { useToast } from "../context/ToastContext";

function OrderDetailsPage() {
  const { id } = useParams();
  const { showToast } = useToast();
  
  const [order, setOrder] = useState({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const result = await getOrderByIdForAdmin(id)
        setOrder(result.data)
        setStatus(result.data.orderStatus)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id])

  // handle change
  const handleChange = (e) => {
    const { value } = e.target

    setStatus(value)
  }


  // handle update order status
  const handleUpdateStatus = async () => {
    try {
      const result = await updateOrderStatus(id, { status })
      console.log(result)
      showToast("Status updated successfully", "success")
    } catch (error) {
      console.log(error)
    }
  }


  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <OrderDetailsHeader 
        orderId={order._id}
        orderStatus={order.orderStatus}
        createdAt={order.createdAt}
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-5 xl:col-span-2">
          <OrderStatusUpdate 
            onChange={handleChange}
            currentStatus={status}
            orderStatus={order.orderStatus}
            handleUpdateStatus={handleUpdateStatus}
          />

          <OrderCustomerInfo 
            info={order.shippingAddress}
          />

          <OrderItems 
            orderItems={order.orderItems}
          />

          <OrderPaymentInfo 
            paymentMethod={order.paymentMethod}
            paymentStatus={order.paymentStatus}
          />

          {/* <OrderTimeline /> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <OrderSummary 
            subTotal={order.itemsPrice}
            discount={order.discountAmount}
            total={order.totalAmount}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;