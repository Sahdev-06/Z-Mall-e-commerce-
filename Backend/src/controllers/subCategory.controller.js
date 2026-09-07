import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { SubCategory } from "../models/subCategory.model.js";
import mongoose from "mongoose";


const createSubCategory = asyncHandler(async (req, res) => {
    const { name, slug, category } = req.body

    if(
        [name, slug, category].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedSubCategory = await SubCategory.findOne({
        $or : [{ name }, { slug }]
    })

    if(existedSubCategory) {
        throw new ApiError(409, "SubCategory with name or slug already exists")
    }

    const subCategory = await SubCategory.create({
        name,
        slug,
        category
    })

    if(!subCategory) {
        throw new ApiError(500, "Something went wrong while creating subCategory")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, subCategory, "SubCategory created Successfully")
    )


})

const updateSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid subCategory ID")
    }

    const { name, slug, category } = req.body

    if(
        [name, slug, category].some(field => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const updatedDetails = {}

    if(name) updatedDetails.name = name
    if(slug) updatedDetails.slug = slug
    if(category) updatedDetails.category = category

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id,
        { $set: updatedDetails },
        { new: true }
    )

    if(!updatedSubCategory) {
        throw new ApiError(404, "SubCategory not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedSubCategory, "SubCategory updated Successfully")
    )

})

const deleteSubCategory = asyncHandler(async (req, res) => {
    const { id } = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid subCategory ID")
    }

    const deletedSubCategory = await SubCategory.findByIdAndDelete(id)

    if(!deletedSubCategory) {
        throw new ApiError(404, "SubCategory not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, null, "SubCategory deleted Successfully")
    )
})

const getAllSubCategories = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 30;
    const { search, category } = req.query;

    const skip = (page - 1) * limit;

    const filter = {};

    if(search) {
        filter["name"] = {
            $regex : search,
            $options : "i"
        }
    }

    if(category) {
        filter.category = category
    }

    const subCategories = await SubCategory.find(filter)
        .populate("category")
        .skip(skip)
        .limit(limit)

    const total = await SubCategory.countDocuments(filter)
    const totalPages = Math.ceil(total / limit)

    if(!subCategories || subCategories.length === 0) {
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    subCategories : [],
                    currentPage : page,
                    totalPages,
                    totalSubCategories : total
                }
            )
        )
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                subCategories,
                currentPage : page,
                totalPages,
                totalSubCategories : total
            }, 
            "All SubCategories fetched Successfully"
        )
    )
})

const getSubCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid subCategory ID")
    }

    const subCategory = await SubCategory.findById(id).populate("category")

    if(!subCategory) {
        throw new ApiError(404, "SubCategory does not exist")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, subCategory, "SubCategory fetched successfully"))
})



export {
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategories,
    getSubCategoryById
}