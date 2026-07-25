import axiosInstance from "../api/axios";


const getAllSubCategories = async () => {
    const response = await axiosInstance.get("/subCategory/all")
    return response.data
}

const getSubCategoryById = async (id) => {
    const response = await axiosInstance.get(`/subCategory/get/${id}`)
    return response.data
}

const createSubCategory = async (data) => {
    const response = await axiosInstance.post("/subCategory/create", data)
    return response.data
}

const updateSubCategory = async (id, data) => {
    const response = await axiosInstance.patch(`/subCategory/update/${id}`, data)
    return response.data
}

const deleteSubCategory = async (id) => {
    const response = await axiosInstance.delete(`/subCategory/delete/${id}`)
    return response.data
}



export {
    getAllSubCategories,
    getSubCategoryById,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}