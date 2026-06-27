import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { InventoryLog } from '../models/inventoryLog.model.js'
import { Product } from '../models/product.model.js'
import mongoose from 'mongoose';


const createInventoryLog = async (product, changedStock, type, reason) => {

    const inventory = await InventoryLog.create({
        product,
        changedStock,
        type,
        reason
    })

    return inventory
}

const getInventoryLogs = asyncHandler(async (req, res) => {
    const { productId } = req.params

    if(!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, 'Invalid product ID')
    }

    const product = await Product.findById(productId)

    if(!product) {
        throw new ApiError(404, 'This product does not exist')
    }

    const inventory = await InventoryLog.find({ product : productId })

    if(inventory.length === 0) {
        return res
        .status(200)
        .json(new ApiResponse(200, [], 'No inventory logs found'))
    }

    return res
    .status(200)
    .json(new ApiResponse(200, inventory, 'Inventory fetched successfully'))
})


export {
    createInventoryLog,
    getInventoryLogs
}