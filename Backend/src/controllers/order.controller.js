import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Order } from '../models/order.model.js';
import { Cart } from '../models/cart.model.js';
import { Address } from '../models/address.model.js';
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
        let items = {}

        items.product = item.product._id
        items.quantity = item.quantity
        items.price = item.product.price
        items.productName = item.product.name
        items.productImage = item.product.images[0]

        cartItems.push(items)
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

    cart.items = []
    await cart.save()

    return res
    .status(201)
    .json(new ApiResponse(201, order, 'Order created successfully'))

})



export {
    createOrder
}