import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Payment } from '../models/payment.model.js';
import { Order } from '../models/order.model.js';
import mongoose from 'mongoose';


const createPayment = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { orderId } = req.body;

    const order = await Order.findById(orderId)

    if(!order) {
        throw new ApiError(404, 'No order found')
    }

    if(String(userId) !== String(order.user)) {
        throw new ApiError(403, 'You have not access')
    }

    const { totalAmount, paymentMethod, paymentStatus } = order

    const payment = await Payment.create({
        user : userId,
        order : orderId,
        totalAmount,
        paymentMethod,
        paymentStatus,
    })

    if(!payment) {
        throw new ApiError(500, 'Payment creation failed')
    }

    return res
    .status(201)
    .json(new ApiResponse(201, payment, 'Payment created successfully'))
})

const getPaymentByOrderId = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { orderId } = req.params;

    if(!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        throw new ApiError(400, 'Invalid order ID')
    }

    const payment = await Payment.findOne({ order : orderId })

    if(!payment) {
        return res
        .status(200)
        .json(new ApiResponse(200, null, 'No payment info found'))
    }

    if(String(userId) !== String(payment.user)) {
        throw new ApiError(403, 'You have not access')
    }

    return res
    .status(200)
    .json(new ApiResponse(200, payment, 'Payment info fetched successfully'))
})

const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid payment ID')
    }

    const payment = await Payment.findById(id)

    if(!payment) {
        throw new ApiError(404, 'No payment found')
    }

    if(String(userId) !== String(payment.user)) {
        throw new ApiError(403, 'You have not access')
    }

    const validStatus = ['Pending', 'Paid', 'Failed', 'Refunded']
    
    if(!validStatus.includes(status)) {
        throw new ApiError(400, 'Invalid payment status')
    }

    payment.paymentStatus = status

    if(status === 'Paid') {
        payment.paidAt = new Date()
    }

    await payment.save()

    return res
    .status(200)
    .json(new ApiResponse(200, payment, 'Payment status update successfully'))
})


export {
    createPayment,
    getPaymentByOrderId,
    updatePaymentStatus
}