import axiosInstance from "../api/axios.js"

const loginAdmin = async (adminData) => {
    const response = await axiosInstance.post("/users/login", adminData)

    return response.data
}

const getCurrentUser = async () => {
    const response = await axiosInstance.get("/users/current-user")

    return response.data
}

const registerUser = async (userData) => {
    const response = await axiosInstance.post("/users/register", userData)
    return response.data
}

const loginUser = async (userData) => {
    const response = await axiosInstance.post("/users/login", userData)
    return response.data
}


export { 
    loginAdmin,
    getCurrentUser,
    registerUser,
    loginUser
}