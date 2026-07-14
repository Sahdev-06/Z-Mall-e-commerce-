import AddressCard from "./AddressCard"

function AddressList({ addresses }) {
    return (
        <>
            <div className="flex flex-col gap-6">
                {
                    addresses.map(({name, phoneNumber, street, city, state, postalCode, landmark, 
                        addressType, isDefault}) => (
                            <AddressCard 
                                key={name}
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
        </>
    )
}


export default AddressList