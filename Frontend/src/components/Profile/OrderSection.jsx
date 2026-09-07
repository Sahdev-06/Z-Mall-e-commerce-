import OrderList from "../Order/OrderList"
import { getMyOrders } from "../../services/orderService.js"
import { useEffect, useState } from "react"
import NoOrders from "../Common/NoOrders.jsx"

function OrderSection() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                const result = await getMyOrders()
                // console.log(result.data)
                setOrders(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOrders();
    }, [])


    return (

        <main className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="mx-auto w-full max-w-5xl">

                <div className="mb-5 sm:mb-6">
                    <h1 className="text-xl font-bold text-slate-900 sm:text-3xl">
                        My Orders
                    </h1>

                    { orders.length > 0 && (
                        <p className="mt-1 text-sm text-slate-500">
                            Track and manage your orders
                        </p>
                    )}

                    <hr className="text-gray-200 mt-3"/>
                </div>

                {
                    orders.length > 0 
                    ? ( <OrderList orders={orders} /> )
                    : ( <NoOrders />)
                }

            </div>
        </main>

    )
}


export default OrderSection