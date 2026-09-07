import axiosInstance from "../api/axios";

// user API
const createOrder = async (orderData) => {
    const response = await axiosInstance.post("/order/create", orderData)
    return response.data
}

const createBuyNowOrder = async (orderData) => {
    const response = await axiosInstance.post("/order/buy-now", orderData)
    return response.data
}

const getMyOrders = async () => {
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
const getAllOrders = async (page = 1, limit = 10, search = "", status = "") => {
    const response = await axiosInstance.get(
        `/order/get-all?page=${page}&limit=${limit}&search=${search}&status=${status}`
    )
    return response.data
}

const updateOrderStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/order/${id}/status`, status)
    return response.data
}

const getOrderByIdForAdmin = async (id) => {
    const response = await axiosInstance.get(`/order/admin/${id}`)
    return response.data
}


export {
    createOrder,
    createBuyNowOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    getOrderByIdForAdmin
}