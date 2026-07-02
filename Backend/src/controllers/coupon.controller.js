import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Coupon } from '../models/coupon.model.js';
import { Cart } from '../models/cart.model.js';
import mongoose from 'mongoose';


const createCoupon = asyncHandler(async (req, res) => {
    const { code, discount, discountType, minimumOrderAmount, expiryDate } = req.body;

    if(
        [code, discount, discountType, minimumOrderAmount, expiryDate]
            .some(field => String(field).trim() === "")
    ) {
        throw new ApiError(400, 'All fields are required')
    }

    const today = new Date()
    const expiry = new Date(expiryDate)

    // validate expiry date
    if(isNaN(expiry.getTime())) {
        throw new ApiError(400, 'Invalid Date, it must be YYYY-MM-DD')
    }

    // compare expiry date with current date
    expiry.setHours(23, 59, 59, 999)
    if(expiry < today) {
        throw new ApiError(400, 'Expiry date cannot be in the past')
    }

    const normalizedCode = code.toUpperCase().trim()
    const isCouponExist = await Coupon.findOne({ code : normalizedCode })

    if(isCouponExist) {
        throw new ApiError(400, 'Coupon code already exist')
    }

    if(discountType === 'Percentage') {
        if(discount < 1 || discount > 100) {
            throw new ApiError(400, 'Discount must be between 1 to 100')
        }
    }

    const coupon = await Coupon.create({
        code,
        discount,
        discountType,
        minimumOrderAmount,
        expiryDate
    })

    if(!coupon) {
        throw new ApiError(500, 'Coupon creation failed')
    }

    return res
    .status(201)
    .json(new ApiResponse(201, coupon, 'Coupon created successfully'))
})

const updateCoupon = asyncHandler(async (req, res) => {
    const { discount, discountType, minimumOrderAmount, expiryDate, isActive } = req.body;
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid coupon ID')
    }

    const updatedCoupon = {}

    // discount type
    if (discountType !== undefined) {
        if (discountType.trim() === "") {
            throw new ApiError(400, 'Discount type is required')
        }

        if (!['Percentage', 'Fixed'].includes(discountType)) {
            throw new ApiError(400, 'Invalid discount type')
        }

        updatedCoupon.discountType = discountType
    }

    // discount
    if (discount !== undefined) {
        if (
            discountType !== undefined &&
            discountType === 'Percentage' &&
            (discount < 1 || discount > 100)
        ) {
            throw new ApiError(400, 'Discount must be between 1 and 100')
        }

        updatedCoupon.discount = discount
    }

    // minimum order amount
    if (minimumOrderAmount !== undefined) {
        if (minimumOrderAmount < 0) {
            throw new ApiError(400, 'Minimum order amount must be greater than or equal to 0')
        }

        updatedCoupon.minimumOrderAmount = minimumOrderAmount
    }

    // expiry date
    if (expiryDate !== undefined) {
        if (expiryDate.trim() === "") {
            throw new ApiError(400, 'Expiry date is required')
        }

        const today = new Date()
        const expiry = new Date(expiryDate)

        if (isNaN(expiry.getTime())) {
            throw new ApiError(400, 'Invalid date. Use YYYY-MM-DD')
        }

        expiry.setHours(23, 59, 59, 999)

        if (expiry < today) {
            throw new ApiError(400, 'Expiry date cannot be in the past')
        }

        updatedCoupon.expiryDate = expiryDate
    }

    // active status
    if (isActive !== undefined) {
        if (![true, false].includes(isActive)) {
            throw new ApiError(400, 'Value must be true or false')
        }

        updatedCoupon.isActive = isActive
    }

    if (Object.keys(updatedCoupon).length === 0) {
        throw new ApiError(400, 'At least one field is required to update')
    }

    const coupon = await Coupon.findByIdAndUpdate(
        id,
        {
            $set: updatedCoupon
        },
        { new: true }
    )

    if (!coupon) {
        throw new ApiError(404, 'Coupon not found')
    }

    return res
        .status(200)
        .json(new ApiResponse(200, coupon, 'Coupon updated successfully'))
})

const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid coupon ID')
    }

    const isCouponExist = await Coupon.findById(id)

    if(!isCouponExist) {
        throw new ApiError(404, "Coupon does not exist")
    }

    const coupon = await Coupon.findByIdAndDelete(id)

    return res
    .status(200)
    .json(new ApiResponse(200, null, 'Coupon deleted successfully'))
})

const getAllCoupons = asyncHandler(async (req, res) => {
    const coupons = await Coupon.find()

    if(coupons.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No coupon found'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, coupons, 'All coupons fetched successfully'))
})

const applyCoupon = asyncHandler(async (req, res) => {
    // todo 
})



export {
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getAllCoupons,
    applyCoupon
}