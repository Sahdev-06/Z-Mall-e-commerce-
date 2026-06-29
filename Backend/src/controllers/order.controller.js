import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';
import { Address } from '../models/address.model.js';
import { Product } from '../models/product.model.js'
import { createInventoryLog } from '../controllers/inventoryLog.controller.js'
import mongoose from 'mongoose';


const createOrder = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user
    const { addressId, paymentMethod } = req.body

    if(!addressId || !mongoose.Types.ObjectId.isValid(addressId)) {
        throw new ApiError(404, 'Invalid address ID')
    }

    if(String(paymentMethod) === "") {
        throw new ApiError(400, 'Payment method required')
    }

    const cart = await Cart.findOne({ user : userId }).populate("items.product")

    if(!cart || cart.items.length === 0) {
        throw new ApiError(404, 'Cart is empty')
    }

    let itemsTotalPrice = 0

    for(const item of cart.items) {
        itemsTotalPrice += item.product.price * item.quantity
    }

    const cartItems = []

    for(const item of cart.items) {
        let dataItem = {}

        dataItem.product = item.product._id
        dataItem.quantity = item.quantity
        dataItem.price = item.product.price
        dataItem.productName = item.product.name
        dataItem.productImage = item.product.images[0]

        cartItems.push(dataItem)
    }

    const address = await Address.findById(addressId)

    if(!address || String(userId) !== String(address.user)) {
        throw new ApiError(400, 'Invalid address ID')
    }

    const { fullName, phoneNumber, street, city, state, postalCode, landmark, addressType } = address

    const selectedAddress = {
        fullName,
        phoneNumber,
        street,
        city,
        state,
        postalCode,
        landmark,
        addressType
    }

    let shippingFee = 0;
    let discountAmount = 0;

    const finalPrice = (itemsTotalPrice + shippingFee) - discountAmount

    for(const item of cart.items) {
        const currentStock = item.product.stock
        const itemQty = item.quantity
        if (itemQty > currentStock) {
            throw new ApiError(400, 'Item quantity exceeds available stock')
        }
    }

    const order = await Order.create({
        user : userId,
        orderItems : cartItems, 
        shippingAddress : selectedAddress, 
        itemsPrice : itemsTotalPrice,  
        totalAmount : finalPrice,
        paymentMethod,
    })

    if(!order) {
        throw new ApiError(500, 'Order creation failed')
    }

    // create inventory
    for(const item of cart.items) {
        const currentStock = item.product.stock
        const itemQty = item.quantity

        const productId = String(item.product._id)
        const product = await Product.findById(productId)

        product.stock = currentStock - itemQty
        await product.save()

        const changedStock = itemQty;
        const type = 'OUT';
        const reason = 'Order placed';

        await createInventoryLog(productId, changedStock, type, reason)
    }

    cart.items = []
    await cart.save()

    return res
    .status(201)
    .json(new ApiResponse(201, order, 'Order created successfully'))

})

const getMyOrders = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user

    const orders = await Order.find({ user : userId })

    if(!orders || orders.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No orders found'))
    } 

    return res
    .status(200)
    .json(new ApiResponse(200, orders, 'All orders fetched successfully'))
})

const getOrderById = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order ID')
    }

    const order = await Order.findById(id)

    if(!order) {
        throw new ApiError(404, 'Order not found')
    }

    if(String(userId) !== String(order.user)) {
        throw new ApiError(403, 'You have not access')
    }

    return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order fetched successfully'))
})

const cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id : userId } = req.user;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order ID')
    }

    const order = await Order.findById(id)

    if(!order) {
        throw new ApiError(404, 'Order not found')
    }

    if(String(userId) !== String(order.user)) {
        throw new ApiError(403, 'You have not access')
    }

    if(order.orderStatus === 'Cancelled') {
        throw new ApiError(400, 'This order has already cancelled')
    }

    if(order.orderStatus === 'Delivered') {
        throw new ApiError(400, 'This order has already delivered')
    }

    order.orderStatus = 'Cancelled'
    order.cancelledAt = new Date()

    await order.save()

    console.log("order : ", order)

    // create inventory
    for(const item of order.orderItems) {
        const productId = String(item.product)
        const itemQty = item.quantity

        const product = await Product.findById(productId)

        if(!product) {
            throw new ApiError(404, 'Product not found')
        }

        product.stock += itemQty
        await product.save()

        const changedStock = itemQty
        const type = 'IN'
        const reason = 'Order cancelled'

        await createInventoryLog(productId, changedStock, type, reason)
    }

    return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order cancelled successfully'))
})

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()

    if(!orders || orders.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No orders found'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, orders, 'All orders fetched successfully'))
})

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order ID')
    }

    const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

    if(!statusOptions.includes(status)) {
        throw new ApiError(400, 'Invalid order status')
    }

    const order = await Order.findById(id)

    if(!order) {
        throw new ApiError(404, 'Order not found')
    }
    
    if(status === 'Delivered') {
        order.deliveredAt = new Date()
    }

    if(status === 'Cancelled') {
        order.cancelledAt = new Date()
    }
    
    order.orderStatus = status;
    await order.save()

    return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order status updated successfully'))

})

const getOrderByIdForAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, 'Invalid order ID')
    }

    const order = await Order.findById(id)

    if(!order) {
        throw new ApiError(404, 'Order not found')
    }

    return res
    .status(200)
    .json(new ApiResponse(200, order, 'Order fetched successfully'))
})

export {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    getOrderByIdForAdmin
}