import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { createInventoryLog } from "../controllers/inventoryLog.controller.js"
import mongoose from "mongoose";

// Admin controller
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, category, subCategory, discount, stock } = req.body;

    if (!name || String(name).trim() === "") {
        throw new ApiError(400, "Product name is required");
    }
    if (!description || String(description).trim() === "") {
        throw new ApiError(400, "Product description is required");
    }

    const priceNum = Number(price);
    if (Number.isNaN(priceNum) || priceNum <= 0) {
        throw new ApiError(400, "Price must be a positive number");
    }

    const existing = await Product.findOne({ name: String(name).trim() });
    if (existing) {
        throw new ApiError(409, "A product with this name already exists");
    }
    
    // Handle image upload to Cloudinary
    const uploadedImage = [];

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "At least one product image is required");
    }

    const uploadPromises = req.files.map(async (file) => {
        const response = await uploadOnCloudinary(file.path);

        if (!response) {
            throw new ApiError(500, "Image upload failed");
        }
        return response.url;
    });


    const results = await Promise.all(uploadPromises);
    uploadedImage.push(...results);

    const discountVal = Number(discount)
    if(discountVal !== undefined) {
        if(discountVal < 0 || discountVal > 100) {
            throw new ApiError(400, "Discount must be between 0 and 100")
        }
    }

    const stockVal = Number(stock)
    if(stockVal !== undefined) {
        if(stockVal < 0) {
            throw new ApiError(400, "Stock cannot be negative")
        }
    }


    const product = await Product.create({
        name,
        description,
        price,
        images: uploadedImage,
        discount : discountVal,
        stock : stockVal,
        category,
        subCategory
    })

    if(stock > 0) {
        await createInventoryLog(product._id, stock, "IN", "Initial stock")
    }

    if(!product) {
        throw new ApiError(500, "Something went wrong while creating product")
    }

    return res
    .status(201)
    .json(new ApiResponse(
        200,
        product,
        "Product created successfully"
    ))
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const updateDetails = {};

    if (name !== undefined) {
        if (String(name).trim() === "") throw new ApiError(400, "Name cannot be empty");
        const existingByName = await Product.findOne({ name: String(name).trim(), _id: { $ne: id } });
        if (existingByName) {
            throw new ApiError(409, "A product with this name already exists");
        }
        updateDetails.name = String(name).trim();
    }

    if (description !== undefined) {
        if (String(description).trim() === "") throw new ApiError(400, "Description cannot be empty");
        updateDetails.description = String(description).trim();
    }

    if (price !== undefined) {
        const priceNum = Number(price);
        if (Number.isNaN(priceNum) || priceNum <= 0) {
            throw new ApiError(400, "Price must be a positive number");
        }
        updateDetails.price = priceNum;
    }
    
    // Handle image uploads if new images are provided
    if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map(async (file) => {
            const response = await uploadOnCloudinary(file.path);
            if (!response) {
                throw new ApiError(500, "Image upload failed");
            }
            return response.url;
        });

        const uploadedImages = await Promise.all(uploadPromises);
        updateDetails.images = uploadedImages;
    }

    if (Object.keys(updateDetails).length === 0) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const product = await Product.findByIdAndUpdate(
        id,
        {
            $set : updateDetails
        },
        { new : true }
    )

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"))
})

const updateProductStock = asyncHandler(async (req, res) => {
    const { newStock } = req.body
    const { id } = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid product ID')
    }

    if(newStock === undefined) {
        throw new ApiError(400, 'New stock is required')
    }

    if(newStock < 0) {
        throw new ApiError(400, 'Stock should not be less than 0')
    }

    const product = await Product.findById(id)

    if(!product) {
        throw new ApiError(404, 'Product not found')
    }

    const oldStock = product.stock

    if(oldStock === newStock) {
        return res
        .status(200)
        .json(new ApiResponse(200, product, 'No stock changed'))
    }

    let changedStock = 0;
    let type;
    let reason;

    if(oldStock < newStock) {
        changedStock = newStock - oldStock
        type = 'IN'
        reason = 'Restock'
    } else {
        changedStock = oldStock - newStock
        type = 'OUT'
        reason = 'Manual Adjustment'
    }

    

    product.stock = newStock
    await product.save()

    await createInventoryLog(product._id, changedStock, type, reason)

    return res
    .status(200)
    .json(new ApiResponse(200, product, 'Product stock updated successfully'))

})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

     // Validate MongoDB ObjectId and prevents from CastError
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"))
})

const getAllProductForAdmin = asyncHandler(async (req, res) => {
    const product = await Product.find().populate("category").populate("subCategory")

    if(!product || product.length === 0) {
        throw new ApiError(404, "Products not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "All Products fetched successfully"))
})

const getProductByIdForAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id).populate("category").populate("subCategory")

    if(!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"))    
})

const toggleFeaturedProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID")
    }

    const product = await Product.findById(id)

    if(!product) {
        throw new ApiError(404, "Product does not exist")
    }

    product.isFeatured = !product.isFeatured
    await product.save()

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"))
})

// public controller
const getAllProduct = asyncHandler(async (req, res) => {
    const product = await Product.find({
        isActive : true,
        stock : { $gt : 0 }
    }).populate("category").populate("subCategory")

    if(!product || product.length === 0) {
        throw new ApiError(404, "Products not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "All Products fetched successfully"))
})

// searching products 
const getProducts = asyncHandler(async (req, res) => {
    const { search, category, sort, page = 1, limit = 10 } = req.query;

    const pageNumber = Number(page)
    const limitNumber = Number(limit)

    const skip = ( pageNumber - 1 ) * limitNumber

    const filter = {
        isActive : true,
        stock : { $gt : 0 }
    }

    // search products based on search query
    if(search && search.trim() !== "") {
        filter.$or = [
            { name : { $regex:search.trim(), $options: "i"} },
            { description : { $regex:search.trim(), $options: "i"} }
        ]
    }

    // search based on category
    if(category) {
        const categoryIds = category.split(",")

        filter.category = {
            $in : categoryIds
        }
    }

    // sort by price
    const sortOption = {}
    if(sort === "price-low-high") {
        sortOption.price = 1
    } else if (sort === "price-high-low") {
        sortOption.price = -1
    }

    const products = await Product.find(filter)
        .populate("category")
        .populate("subCategory")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)

    if(!products || products.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(
            200,
            {
                products : [],
                pagination : {
                    currentPage : pageNumber,
                    totalPages : 0,
                    totalProducts : 0,
                    limit
                }
            },
            "No products available"
        ))
    }

    const totalProducts = await Product.countDocuments(filter)
    const totalPages = Math.ceil(totalProducts / limitNumber)

    return res
    .status(200)
    .json(new ApiResponse(
        200, 
        {
            products,
            pagination : {
                currentPage : pageNumber,
                totalPages,
                totalProducts,
                limit : limitNumber
            }
        }, 
        "Products fetched successfully"
    ))
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id).populate("category").populate("subCategory")

    if(!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"))
})

const getFeaturedProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort

    const skip = (page - 1) * limit

    const filter = {
        isActive : true,
        isFeatured : true
    }

    // sort by price
    const sortOption = {}
    if(sort === "price-low-high") {
        sortOption.price = 1
    } else if (sort === "price-high-low") {
        sortOption.price = -1
    }


    const featuredProducts = await Product.find(filter)
    .populate("category")
    .populate("subCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)

    if(!featuredProducts || featuredProducts.length === 0) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    products : [],
                    pagination: {
                        currentPage: page,
                        totalPages: 0,
                        totalProducts: 0,
                        limit
                    }
                },
                "No featured products available"
            )
        )
    }

    const totalFeaturedProducts = await Product.countDocuments(filter)

    const totalPages = Math.ceil(totalFeaturedProducts / limit)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                products : featuredProducts,
                pagination : {
                    currentPage : page,
                    totalPages,
                    totalProducts : totalFeaturedProducts,
                    limit
                }
            },
            "Featured products fetched successfully"
        )
    )
})

const getTopDealsProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort

    const skip = (page - 1) * limit;

    const filter = {
        isActive : true,
        discount : { $gt : 0 }
    }

    // sort by price
    let sortOption = {
        discount : -1,
        createdAt : -1
    }

    if(sort === "price-low-high") {
        sortOption = {
            price: 1
        }
    } else if (sort === "price-high-low") {
        sortOption = {
            price: -1
        }
    }

    const topDealsProducts = await Product.find(filter)
    .populate("category")
    .populate("subCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)

    if(!topDealsProducts || topDealsProducts.length === 0) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    products : [],
                    pagination: {
                        currentPage: page,
                        limit,
                        totalProducts: 0,
                        totalPages: 0
                    }
                },
                "No top deals products available"
            )
        )
    }

    const totalTopDealsProducts = await Product.countDocuments(filter)

    const totalPages = Math.ceil(totalTopDealsProducts / limit)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                products : topDealsProducts,
                pagination: {
                    currentPage: page,
                    limit,
                    totalProducts: totalTopDealsProducts,
                    totalPages
                }
            },
            "Top deals products fetched successfully"
        )
    )
})

const getNewArrivalProducts = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sort = req.query.sort

    const skip = (page - 1) * limit;

    const filter = {
        isActive : true,
    }

    // sort by price
    let sortOption = {
        createdAt : -1
    }
    if(sort === "price-low-high") {
        sortOption = {
            price: 1
        }
    } else if (sort === "price-high-low") {
        sortOption = {
            price: -1
        }
    }

    const newArrivalProducts = await Product.find(filter)
    .populate("category")
    .populate("subCategory")
    .sort(sortOption)
    .skip(skip)
    .limit(limit)

    if(!newArrivalProducts || newArrivalProducts.length === 0) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    products : [],
                    pagination: {
                        currentPage: page,
                        limit,
                        totalProducts: 0,
                        totalPages: 0
                    }
                },
                "No new arrival products available"
            )
        )
    }

    const totalNewArrivalProducts = await Product.countDocuments(filter)

    const totalPages = Math.ceil(totalNewArrivalProducts / limit)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                products : newArrivalProducts,
                pagination: {
                    currentPage: page,
                    limit,
                    totalProducts: totalNewArrivalProducts,
                    totalPages
                }
            },
            "New arrival products fetched successfully"
        )
    )
})

export {
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
    getAllProductForAdmin,
    getProductByIdForAdmin,
    toggleFeaturedProduct,
    getAllProduct,
    getProducts,
    getProductById,
    getFeaturedProducts,
    getTopDealsProducts,
    getNewArrivalProducts
}