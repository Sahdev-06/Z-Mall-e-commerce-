import OrderCard from "./OrderCard"

function OrderList({ orders }) {
    return (
        <div className="flex flex-col gap-3">
            {
                orders.map(({ _id, orderItems, orderStatus, createdAt }) => (
                    <OrderCard 
                        key={_id}
                        orderId={_id}
                        orderItems={orderItems}
                        orderStatus={orderStatus}
                        createdAt={createdAt}
                        viewBtn={true}
                    />
                ))
            }
        </div>
    )
}


export default OrderList