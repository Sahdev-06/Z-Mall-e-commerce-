import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Banner } from '../models/banner.model.js';
import { Category } from '../models/category.model.js';
import { SubCategory } from '../models/subCategory.model.js'
import { uploadOnCloudinary } from '../services/cloudinary.js';
import mongoose from 'mongoose';


const createBanner = asyncHandler(async (req, res) => {
    const { title, category, subCategory } = req.body;

    if(
        [title, category].some(field => String(field).trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    if(!category || !mongoose.Types.ObjectId.isValid(category)) {
        throw new ApiError(400, 'Invalid category')
    }

    const isCategoryExist = await Category.findById(category)

    if(!isCategoryExist) {
        throw new ApiError(404, 'Category does not exist')
    }

    if(subCategory) {
        if(!subCategory || !mongoose.Types.ObjectId.isValid(subCategory)) {
            throw new ApiError(400, 'Invalid subCategory')
        }

        const isSubCategoryExist = await SubCategory.findById(subCategory)

        if(!isSubCategoryExist) {
            throw new ApiError(404, 'SubCategory does not exist')
        }

        if(String(isSubCategoryExist.category) !== String(isCategoryExist._id)) {
            throw new ApiError(400, 'This subCategory does not belong to given category')
        }
    }

    const isBannerExist = await Banner.findOne({
        category,
        isActive : true
    })

    if(isBannerExist) {
        throw new ApiError(400, 'An active banner already exists for this category.')
    }

    // Handle image upload to Cloudinary
    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) {
        throw new ApiError(400, "Banner image is required");
    }

    const response = await uploadOnCloudinary(imageLocalPath);

    if (!response) {
        throw new ApiError(500, "Image upload failed");
    }

    const banner = await Banner.create({
        title,
        image : response.url,
        category,
        subCategory
    })

    if(!banner) {
        throw new ApiError(500, 'Banner creation failed')
    }

    return res
    .status(201)
    .json(new ApiResponse(201, banner, 'Banner created successfully'))
})

const updateBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, subCategory, isActive } = req.body;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid banner ID')
    }

    const isBannerExist = await Banner.findById(id)

    if(!isBannerExist) {
        throw new ApiError(404, 'Banner does not exist')
    }

    const updatedBanner = {}

    if(title !== undefined) {
        if(title.trim() === "") {
            throw new ApiError(400, 'Title cannot be empty')
        }

        updatedBanner.title = title
    }

    if(subCategory !== undefined) {
        if(!subCategory || !mongoose.Types.ObjectId.isValid(subCategory)) {
            throw new ApiError(400, 'Invalid subCategory ID')
        }

        const isSubCategoryExist = await SubCategory.findById(subCategory)

        if(!isSubCategoryExist) {
            throw new ApiError(400, 'subCategory does not exist')
        }

        if(String(isSubCategoryExist.category) !== String(isBannerExist.category)) {
            throw new ApiError(400, 'Selected subcategory does not belong to this category')
        }

        updatedBanner.subCategory = subCategory
    }

    // handling image updation
    if (req.file) {
        const response = await uploadOnCloudinary(req.file?.path);

        if (!response) {
            throw new ApiError(500, "Image upload failed");
        }

        updatedBanner.image = response.url;
        
    }

    if (isActive === true && isBannerExist.isActive === false) {
        const activeBanner = await Banner.findOne({
            category: isBannerExist.category,
            isActive: true,
            _id: { $ne: id }
    })

    if (activeBanner) {
        throw new ApiError(400, 'An active banner already exists for this category')
    }
}
    

    if (isActive !== undefined) {
        if (![true, false].includes(isActive)) {
            throw new ApiError(400, 'Value must be true or false')
        }
    
        updatedBanner.isActive = isActive
    }

    const banner = await Banner.findByIdAndUpdate(
        id,
        {
            $set : updatedBanner
        },
        { new : true }
    )

    if(!banner) {
        throw new ApiError(500, 'Something went wrong while updating banner')
    }

    return res
    .status(200)
    .json(new ApiResponse(200, banner, 'Banner updated successfully'))
})

const deleteBanner = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid banner ID')
    }

    const banner = await Banner.findByIdAndDelete(id)

    if(!banner) {
        throw new ApiError(404, 'Banner not found')
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, 'Banner deleted successfully'))
})

const getAllBanners = asyncHandler(async (req, res) => {
    const banners = await Banner.find()

    if(banners.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No banner found'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, banners, 'All banners fetched successfully'))
})

const getActiveBanners = asyncHandler(async (req, res) => {
    const activeBanners = await Banner.find({ isActive : true })

    if(activeBanners.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No active banners found'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, activeBanners, 'All active banners fetched successfully'))
})



export {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanners,
    getActiveBanners
}