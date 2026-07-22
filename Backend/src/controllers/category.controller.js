import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { uploadOnCloudinary } from '../services/cloudinary.js';
import { Category } from '../models/category.model.js';
import mongoose from 'mongoose';


const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, description, image } = req.body;

    if (
        [name, slug, description].some(field => !field || String(field).trim() === "")
    ) {
        throw new ApiError(400, "All fields are required ");
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        throw new ApiError(409, "A category with this name already exists");
    }

    // Handle image upload to Cloudinary
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Category image is required");
    }

    const response = await uploadOnCloudinary(imageLocalPath);

    if (!response) {
        throw new ApiError(500, "Image upload failed");
    }

    // Create the category with the uploaded image URL
    const category = await Category.create({
        name,
        slug,
        description,
        image: response.url
    })

    if (!category) {
        throw new ApiError(500, "Something went wrong while creating category");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, category, "Category created successfully"));

});

const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid category ID");
    }

    const updateDetails = {};

    if (name !== undefined) {
        if (String(name).trim() === "") throw new ApiError(400, "Name cannot be empty");
        updateDetails.name = name;
    }

    if (slug !== undefined) {
        if (String(slug).trim() === "") throw new ApiError(400, "Slug cannot be empty");
        updateDetails.slug = slug;
    }

    if (description !== undefined) {
        if (String(description).trim() === "") throw new ApiError(400, "Description cannot be empty");
        updateDetails.description = description;
    }

    if (req.file) {
        const response = await uploadOnCloudinary(req.file?.path);

        if (!response) {
            throw new ApiError(500, "Image upload failed");
        }

        updateDetails.image = response.url;

    }

    const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: updateDetails },
        { new: true }
    )

    if (!updatedCategory) {
        throw new ApiError(404, "Category not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));

})

const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid category ID")
    }

    const deletedCategory = await Category.findByIdAndDelete(id)

    if (!deletedCategory) {
        throw new ApiError(404, "Category not found")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, null, "Category deleted Successfully")
        )
})

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()

    if(!categories || categories.length === 0) {
        throw new ApiError(404, "No categories found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, categories, "All categories fetched successfully"))
})

export {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories
}
