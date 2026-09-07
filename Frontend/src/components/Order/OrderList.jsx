import OrderCard from "./OrderCard"

function OrderList({ orders,  }) {
    return (
        <div className="flex w-full flex-col gap-4">
            {
                orders.map(({ _id, orderItems, orderStatus, createdAt }) => (
                    <OrderCard 
                        key={_id}
                        orderId={_id}
                        orderItems={orderItems}
                        orderStatus={orderStatus}
                        createdAt={createdAt}
                        showViewDetails={true}
                        showCancelOrder={false}
                    />
                ))
            }
        </div>
    )
}


export default OrderList