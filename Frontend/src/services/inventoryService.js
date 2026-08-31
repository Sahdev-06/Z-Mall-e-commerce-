import axiosInstance from "../api/axios";

const getProductInventory = async (id) => {
    const response = await axiosInstance.get(`/inventory/${id}`)
    return response.data
}


export {
    getProductInventory
}