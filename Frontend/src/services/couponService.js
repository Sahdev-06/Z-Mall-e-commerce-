import axiosInstance from "../api/axios";

const createCoupon = async (couponData) => {
    const response = await axiosInstance.post("/coupon/create", couponData)
    return response.data
}

const getCouponById = async (id) => {
    const response = await axiosInstance.get(`/coupon/get/${id}`)
    return response.data
}

const updateCoupon = async (id, couponData) => {
    const response = await axiosInstance.patch(`/coupon/update/${id}`, couponData)
    return response.data
}

const deleteCoupon = async (id) => {
    const response = await axiosInstance.delete(`/coupon/delete/${id}`)
    return response.data
}

const getAllCoupons = async () => {
    const response = await axiosInstance.get("/coupon/all", )
    return response.data
}

const applyCouponCode = async (couponData) => {
    const response = await axiosInstance.post("/coupon/apply", couponData)
    return response.data
}


export {
    createCoupon,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    applyCouponCode
}