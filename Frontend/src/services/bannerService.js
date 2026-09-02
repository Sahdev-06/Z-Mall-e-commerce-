import axiosInstance from "../api/axios";

const getActiveBanners = async () => {
    const response = await axiosInstance.get("/banner/active")
    return response.data
}


export {
    getActiveBanners
}