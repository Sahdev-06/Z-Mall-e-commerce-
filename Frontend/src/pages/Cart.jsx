import CartList from "../components/Cart/CartList"
import OrderSummary from "../components/Cart/OrderSummary"

function Cart({ carts }) {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-2">
                    <CartList carts={carts}/>
                </div>
                <div className="col-span-1">
                    <OrderSummary />
                </div>
            </div>
        </>
    )
}


export default Cart