import { addresses } from "../../Dummy/dummyData"
import AddressList from "../Checkout/AddressList"
import { useAddress } from "../../context/AddressContext"
import { useNavigate } from "react-router-dom"
import NoAddress from "../Common/NoAddress"

function AddressSection() {
    const navigate = useNavigate();
    const { addresses } = useAddress();

    return (
        <>
            {
                addresses.length > 0 
                ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        <AddressList addresses={addresses} />
                    </div>
                )
                : ( <NoAddress />)
                
            }
        </>
    )
}


export default AddressSection