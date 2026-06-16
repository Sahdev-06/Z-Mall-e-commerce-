import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import mongoose from "mongoose";


const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, category } = req.body;
    console.log("category : ", category)

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


    const product = await Product.create({
        name,
        description,
        price,
        images: uploadedImage,
        category
    })

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

const getAllProduct = asyncHandler(async (req, res) => {
    const product = await Product.find().populate("category")

    if(!product) {
        throw new ApiError(404, "Products not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "All Products fetched successfully"))
})

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findById(id)

    if(!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"))
})

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById
}