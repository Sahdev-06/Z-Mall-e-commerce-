import axiosInstance from "../api/axios";

const getAllUsers = async (page = 1, limit = 10, search = "", status = "") => {
    const response = await axiosInstance.get(
        `/users/get-users?page=${page}&limit=${limit}&search=${search}&status=${status}`
    )
    return response.data
}

const getUserById = async (userId) => {
    const response = await axiosInstance.get(`/users/get-user/:${userId}`)
    return response.data
}



export {
    getAllUsers,
    getUserById
}