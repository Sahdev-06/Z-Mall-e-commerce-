import axiosInstance from "../api/axios.js"

// admin api
const createProduct = async (productData) => {
    const response = await axiosInstance.post("/product/create", productData)
    return response.data
}

const getAllProductsForAdmin = async () => {
    const response = await axiosInstance.get("/product/all")
    return response.data
}

const getProductByIdForAdmin = async (id) => {
    const response = await axiosInstance.get(`/product/get/${id}`)
    return response.data
}

const updateProduct = async (id, productdata) => {
    const response = await axiosInstance.patch(`/product/update/${id}`, productdata)
    return response.data
}

const updateProductStock = async (id, stockData) => {
    const response = await axiosInstance.patch(`/product/${id}/stock`, stockData)
    return response.data
}

const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`/product/delete/${id}`)
    return response.data
}

const featuredProduct = async (id) => {
    const response = await axiosInstance.patch(`/product/${id}/featured`)
    return response.data
}

// public api
const getAllProducts = async () => {
    const response = await axiosInstance.get("/product/get-all-product")
    return response.data
}

const getProductById = async (id) => {
    const response = await axiosInstance.get(`/product/get-product/${id}`)
    return response.data
}

const getProducts = async (search, categories, sort, page, limit) => {
    const response = await axiosInstance.get("/product/get-products", {
        params : {
            search,
            category : categories?.join(","),
            sort,
            page,
            limit
        }
    })
    return response.data
}

const getFeaturedProducts = async (page, limit, sort) => {
    const response = await axiosInstance.get("/product/featured", {
        params : {
            page,
            limit,
            sort
        }
    })
    return response.data
}

const getTopDealsProducts = async (page, limit, sort) => {
    const response = await axiosInstance.get("/product/top-deals", {
        params : {
            page,
            limit,
            sort
        }
    })
    return response.data
}

const getNewArrivalProducts = async (page, limit, sort) => {
    const response = await axiosInstance.get("/product/new-arrivals", {
        params : {
            page,
            limit,
            sort
        }
    })
    return response.data
}


export {
    createProduct,
    getAllProductsForAdmin,
    getProductByIdForAdmin,
    updateProduct,
    updateProductStock,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProducts,
    featuredProduct,
    getFeaturedProducts,
    getTopDealsProducts,
    getNewArrivalProducts
}