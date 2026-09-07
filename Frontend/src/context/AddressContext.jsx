import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { 
    getAllAddresses,
    deleteAddress,
    setDefaultAddress
} from "../services/addressService.js"

import { useAuth } from "./AuthContext.jsx";

export const AddressContext = createContext()

export function AddressProvider ({ children }) {
    const [addresses, setAddresses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { user } = useAuth();

    // fetch all addresses
    const fetchAddresses = async () => {
        if(!user || user.role !== "customer") {
            setAddresses([])
            setLoading(false)
            return;
        }


        try {
            const result = await getAllAddresses()
            setAddresses(result.data)
        } catch (error) {
            setError("Failed to load addresses")
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
      fetchAddresses();
    }, [user])


    // delete address
    const handleDeleteAddress = async (id) => {
        try {
            const result = await deleteAddress(id)
            setAddresses(
                addresses.filter(address => address._id !== id)
            )
        } catch (error) {
            setError("Failed to delete address")
        }
    }

    // set default address
    const handleSetDefaultAddress = async (id) => {
        try {
            const result = await setDefaultAddress(id)
            await fetchAddresses();
        } catch (error) {
            setError("Failed to set default address")
        }
    }

    const selectedAddress = addresses.find(address => address.isDefault === true)

    return (
        <AddressContext.Provider
            value={{
                addresses,
                loading,
                error,
                selectedAddress,
                handleDeleteAddress,
                fetchAddresses,
                handleSetDefaultAddress,
            }}
        >
            { children }
        </AddressContext.Provider>
    )
    
}

export function useAddress() {
    return useContext(AddressContext)
}

export default AddressProvider