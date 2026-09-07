import axiosInstance from "../api/axios.js"


const getDashboardStats = async () => {
    const response = await axiosInstance.get("/dashboard/getStats")
    return response.data
}


export {
    getDashboardStats
}