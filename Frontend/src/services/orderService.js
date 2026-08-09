import axiosInstance from "../api/axios";

// user API
const createOrder = async (orderData) => {
    const response = await axiosInstance.post("/order/create", orderData)
    return response.data
}

const getAllOrders = async () => {
    const response = await axiosInstance.get("/order/get")
    return response.data
}

const getOrderById = async (id) => {
    const response = await axiosInstance.get(`/order/get/${id}`)
    return response.data
}

const cancelOrder = async (id) => {
    const response = await axiosInstance.get(`/order/cancel/${id}`)
    return response.data
}

// Admin API
const getAllOrdersForAdmin = async () => {
    const response = await axiosInstance.get("/order/get-all")
    return response.data
}

const updateOrderStatus = async (id) => {
    const response = await axiosInstance.patch(`/order/${id}/status`)
    return response.data
}

const getOrderByIdForAdmin = async (id) => {
    const response = await axiosInstance.get(`/order/admin/${id}`)
    return response.data
}


export {
    createOrder,
    getAllOrders,
    getOrderById,
    cancelOrder,
    getAllOrdersForAdmin,
    updateOrderStatus,
    getOrderByIdForAdmin
}