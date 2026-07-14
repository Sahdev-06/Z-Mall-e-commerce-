import Breadcrumb from "../components/Common/Breadcrumb"
import AddressList from "../components/Checkout/AddressList"
import OrderSummary from "../components/Cart/OrderSummary"

function Checkout({ addresses }) {
    return (
        <>
            <div className="space-y-8">
                <Breadcrumb />
                <h2 className="text-2xl font-bold text-slate-900">
                    Delivery Address
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="col-span-2 space-y-6">
                        <AddressList addresses={addresses}/>
                        <button className="self-start border border-orange-500 text-orange-500
                                    hover:bg-orange-500 hover:text-white font-medium px-5 py-3 
                                    rounded-xl transition duration-300">
                            + Add New Address
                        </button>
                    </div>
                    <div>
                        <OrderSummary />
                    </div>
                </div>
                
            </div>
        </>
    )
}


export default Checkout