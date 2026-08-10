import ItemCard from "./ItemCard"
import { useNavigate } from "react-router-dom";

function OrderCard({ orderId, orderItems, orderStatus, createdAt, viewBtn }) {
    const navigate = useNavigate();
    const date = new Date(createdAt)

    const formatted = date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });


    return (
        <div 
            className="flex flex-col border border-gray-200 gap-1 p-2 bg-white shadow-sm"
        >
            <div className="flex itemx-center justify-between border-b p-2">
                <div className="text-sm text-gray-700">
                    <p className="flex gap-2 font-medium">
                        Order ID: 
                        <span className="text-slate-900">
                            #{orderId}
                        </span>
                    </p>
                    <p>
                        Placed on: {formatted}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-700">
                        Order Status
                    </p>
                    <p className={`text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded-full
                        ${
                            orderStatus === "Pending"
                            ? "bg-orange-100 text-orange-500"
                            : orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-500"
                        }
                        `}>
                        {orderStatus}
                    </p>
                </div>
            </div>
            <div>
                {
                    orderItems.map(({ _id, productImage, productName, price, quantity }) => (
                        <ItemCard 
                            key={_id}
                            productImage={productImage}
                            productName={productName}
                            price={price}
                            quantity={quantity}
                        />
                    ))
                }
            </div>
            <div className="flex items-center justify-between px-2 py-3 border-t">
                <p className="text-sm text-gray-700">
                    Total Items: {orderItems.length}
                </p>
                {
                    viewBtn && (
                        <button className="text-sm border border-orange-500 text-orange-500 p-2 rounded-sm
                            hover:bg-orange-500 hover:text-white cursor-pointer transition"
                            onClick={() => navigate(`/order-details/${orderId}`)}
                        >
                            View Details
                        </button>
                    )
                }
            </div>
        </div>
    )
}


export default OrderCard