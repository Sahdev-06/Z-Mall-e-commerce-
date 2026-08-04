import axiosInstance from "../api/axios";


const getCartItems = async () => {
    const response = await axiosInstance.get("/cart")
    return response.data
}

const addToCart = async (items) => {
    const response = await axiosInstance.post("/cart", items)
    return response.data
}

const updateCartItemQty = async (id, itemQty) => {
    const response = await axiosInstance.patch(`/cart/items/${id}`, itemQty)
    return response.data
}

const removeCartItem = async (id) => {
    const response = await axiosInstance.delete(`/cart/items/${id}`)
    return response.data
}

const removeAllCartItems = async () => {
    const response = await axiosInstance.delete("/cart")
    return response.data
}


export {
    getCartItems,
    addToCart,
    updateCartItemQty,
    removeCartItem,
    removeAllCartItems
}