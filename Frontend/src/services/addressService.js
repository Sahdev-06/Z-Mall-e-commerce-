import axiosInstance from "../api/axios";


const createAddress = async (addressData) => {
    const response = await axiosInstance.post("/addresses/create", addressData)
    return response.data
}

const updateAddress = async (id, addressData) => {
    const response = await axiosInstance.patch(`/addresses/update/${id}`, addressData)
    return response.data
}

const deleteAddress = async (id) => {
    const response = await axiosInstance.delete(`/addresses/delete/${id}`)
    return response.data
}

const getAllAddresses = async () => {
    const response = await axiosInstance.get("/addresses/all")
    return response.data
}

const getAddressById = async (id) => {
    const response = await axiosInstance.get(`/addresses/${id}`)
    return response.data
}

const setDefaultAddress = async (id) => {
    const response = await axiosInstance.patch(`/addresses/set-default/${id}`)
    return response.data
}



export {
    createAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getAddressById,
    setDefaultAddress
}