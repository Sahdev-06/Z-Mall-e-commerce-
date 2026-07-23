import axiosInstance from "../api/axios.js"

const createCategory = async (categoryData) => {
    const response = await axiosInstance.post("/category/create", categoryData)
    console.log(response.data)
}

const getAllCategories = async () => {
    const response = await axiosInstance.get("/category/all")
    return response.data
}

const getCategoryById = async (id) => {
    const response = await axiosInstance.get(`/category/get/${id}`)
    return response.data
}

const updateCategory = async (id, categoryData) => {
    const response = await axiosInstance.patch(`/category/update/${id}`, categoryData)
    return response.data
}

const deleteCategory = async (id) => {
    const response = await axiosInstance.delete(`/category/delete/${id}`)
    return response.data
}


export {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}