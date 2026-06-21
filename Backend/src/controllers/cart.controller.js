import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';
import mongoose from 'mongoose';

// create a cart for a user
const addToCart = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { items } = req.body;
    const { productId, quantity } = items[0]
    console.log("productId : ", productId)
    if(!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID')
    }    

    const qty = Number(quantity)

    if(!qty || qty < 1) {
        throw new ApiError(400, 'Quantity must be at least 1')
    }

    const existingProduct = await Product.findById(productId)
    if(!existingProduct) {
        throw new ApiError(404, 'Product not found')
    }


    // check if cart already exists for the user
    let existingCart = await Cart.findOne({ user : userId });
    if(!existingCart) {
        existingCart = await Cart.create(
        { 
            user : userId,
            items : [
                {
                    product : productId,
                    quantity : qty
                }
            ]
        }
    );
    } else  {
        const cartItem = existingCart.items.find(item => item.product.toString() === productId.toString())
        if(cartItem) {
            cartItem.quantity += qty
        } else {
            existingCart.items.push({
                product : productId,
                quantity : qty
            })

        }
        await existingCart.save();
    }


    return res
    .status(200)
    .json(new ApiResponse(200, existingCart, 'Product added to cart successfully'));
})

const getCart = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;

    const cart = await Cart.findOne({ user : userId }).populate("items.product")

    if(!cart || cart.items.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, { items : []}, 'Cart is empty'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, cart, 'Cart fetched successfully'));
})

const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { _id : userId } = req.user;

    if(!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid item ID')
    }

    const cart = await Cart.findOne({ user : userId })

    if(!cart) {
        throw new ApiError(404, 'Cart does not exist')
    }

    const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId.toString()
    )


    if(itemIndex === -1) {
        throw new ApiError(404, 'Item not found in cart')
    }

    cart.items.splice(itemIndex, 1)

    await cart.save();

    return res
    .status(200)
    .json(new ApiResponse(200, null, 'Item removed successfully'))
})

const updateCartItemQuantity = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user;
    const { quantity } = req.body;
    const { productId } = req.params;

    if(!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID')
    }

    const qty = Number(quantity)

    if(!qty || qty < 1) {
        throw new ApiError(400, 'Quantity must be at least 1')
    }

    const cart = await Cart.findOne({ user : userId })

    if(!cart) {
        throw new ApiError(404, 'Cart not found')
    }

    const cartItem = cart.items.find(item => item.product.toString() === productId.toString())

    if(!cartItem) {
        throw new ApiError(404, 'Item not found in cart')
    }

    cartItem.quantity = qty;

    await cart.save()

    return res
    .status(200)
    .json(new ApiResponse(200, cart, 'Item quantity updated successfully'))
})

const clearCart = asyncHandler(async (req, res) => {
    const { _id : userId } = req.user

    const cart = await Cart.findOne({ user : userId })

    if(!cart) {
        throw new ApiError(404, 'Cart not found')
    }

    cart.items = []
    await cart.save();

    return res
    .status(200)
    .json(new ApiResponse(200, cart, 'All cart items removed successfully'))
})


export {
    addToCart,
    getCart,
    removeCartItem,
    updateCartItemQuantity,
    clearCart
}