import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/review.model.js";
import { Product } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import mongoose from "mongoose";


const createReview = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { rating, message, productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID')
    }

    const product = await Product.findById(productId)

    if (!product) {
        throw new ApiError(404, 'Product not found')
    }

    if (
        [rating, message].some(field => String(field).trim() === "")
    ) {
        throw new ApiError(400, 'Both fields are required')
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(400, 'Rating must be between 1 and 5')
    }

    // verified purchase check 
    const orders = await Order.find({
        user: userId,
        orderStatus: 'Delivered'
    })

    if (orders.length === 0) {
        throw new ApiError(404, 'No delivered orders found')
    }

    let purchased = false;
    for (const order of orders) {
        for (const item of order.orderItems) {
            if (String(item.product) === String(productId)) {
                purchased = true;
                break;
            }
        }

        if (purchased) {
            break;
        }
    }

    if (!purchased) {
        throw new ApiError(400, "You can review only products you have purchased.")
    }

    const isReviewExist = await Review.findOne({
        user: userId,
        product: productId
    })

    if (isReviewExist) {
        throw new ApiError(400, 'You have already reviewed this product')
    }

    const review = await Review.create({
        user: userId,
        product: productId,
        rating,
        message
    })

    return res
        .status(201)
        .json(new ApiResponse(201, review, 'Review created successfully'))
})

const updateReview = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const { rating, message } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid review ID')
    }

    if (rating !== undefined) {
        if (rating < 1 || rating > 5) {
            throw new ApiError(400, "Rating must be between 1 and 5")
        }
    }

    if (message !== undefined) {
        if (message.trim() === "") {
            throw new ApiError(400, "Message cannot be empty")
        }
    }

    if (rating === undefined && message === undefined) {
        throw new ApiError(400, "At least one field is required to update")
    }

    const review = await Review.findById(id)

    if (!review) {
        throw new ApiError(404, "Review not found")
    }

    if (String(userId) !== String(review.user)) {
        throw new ApiError(403, "You are not authorized to update this review.")
    }

    if (rating !== undefined) {
        review.rating = rating
    }

    if (message !== undefined) {
        review.message = message
    }

    await review.save()

    return res
        .status(200)
        .json(new ApiResponse(200, review, 'Review updated successfully'))
})

const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid review ID')
    }

    const isReviewExist = await Review.findById(id)

    if (!isReviewExist) {
        throw new ApiError(404, 'Review not found')
    }

    if (String(userId) !== String(isReviewExist.user)) {
        throw new ApiError(403, "You are not authorized to delete this review.")
    }

    const review = await Review.findByIdAndDelete(id)

    return res
        .status(200)
        .json(new ApiResponse(200, null, 'Review deleted successfully'))
})

const getProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID')
    }

    const product = await Product.findById(productId)

    if(!product) {
        throw new ApiError(404, 'This product does not exist')
    }

    const review = await Review.find({ product : productId})

    if (review.length === 0) {
        return res
            .status(200)
            .json(new ApiResponse(200, [], 'No review present for this product'))
    }

    return res
        .status(200)
        .json(new ApiResponse(200, review, 'All Reviews fetched successfully'))
})



export {
    createReview,
    updateReview,
    deleteReview,
    getProductReviews
}