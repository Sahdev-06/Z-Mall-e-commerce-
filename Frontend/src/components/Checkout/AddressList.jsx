import AddressCard from "./AddressCard"
import { useNavigate, useLocation } from "react-router-dom"

function AddressList({ addresses }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <section className="w-full">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between md:mb-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                            Delivery Address
                        </h2>
                        <p className="mt-1 text-sm text-gray-500 md:text-base">
                            Select an addres for your order
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/address/create", {
                            state : { from : location }
                        })}
                        className="text-sm font-medium text-orange-500 transition-colors cursor-pointer
                                hover:text-orange-600 md:text-base"
                    >
                        + New Address
                    </button>
                </div>

                <div className="space-y-3">
                    {
                        addresses.map(({ _id, fullName, phoneNumber, street, city, state, postalCode, landmark, 
                            addressType, isDefault}) => (
                                <AddressCard 
                                    key={_id}
                                    _id={_id}
                                    fullName={fullName}
                                    phoneNumber={phoneNumber}
                                    street={street}
                                    city={city}
                                    state={state}
                                    postalCode={postalCode}
                                    landmark={landmark}
                                    addressType={addressType}
                                    isDefault={isDefault}
                                />
                        ))
                    }
                </div>
            </section>
            {/* <div className="flex flex-col gap-6">
                {
                    addresses.map(({ _id, fullName, phoneNumber, street, city, state, postalCode, landmark, 
                        addressType, isDefault}) => (
                            <AddressCard 
                                key={_id}
                                _id={_id}
                                fullName={fullName}
                                phoneNumber={phoneNumber}
                                street={street}
                                city={city}
                                state={state}
                                postalCode={postalCode}
                                landmark={landmark}
                                addressType={addressType}
                                isDefault={isDefault}
                            />
                        ))
                }
            </div> */}
        </>
    )
}


export default AddressList