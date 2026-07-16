import { addresses } from "../../Dummy/dummyData"
import AddressList from "../Checkout/AddressList"

function AddressSection() {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    My Addresses
                </h2>
                <AddressList addresses={addresses}/>
                <button className="self-start border border-orange-500 text-orange-500
                                    hover:bg-orange-500 hover:text-white font-medium px-5 py-3 
                                    rounded-xl transition duration-300">
                    + Add New Address
                </button>
            </div>
        </>
    )
}


export default AddressSection