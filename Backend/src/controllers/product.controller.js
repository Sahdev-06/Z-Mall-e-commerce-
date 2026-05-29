import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";


const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body

    if (
    !name?.trim() ||
    !description?.trim() ||
    price == null ||
    price <= 0
    ) {
    throw new ApiError(400, "Invalid product data");
    }

    const product = await Product.create({
        name,
        description,
        price
    })

    if(!product) {
        throw new ApiError(500, "Something went wrong while creating product")
    }

    return res
    .status(201)
    .json(new ApiResponse(
        200,
        product,
        "Product created successfully"
    ))
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body
    const { id } = req.params

    const updateDetails = {};

    // Only add name if it's provided and not empty
    if (typeof name === "string" && name.trim() !== "") {
        updateDetails.name = name.trim();
    }

    // Only add description if it's provided and not empty
    if (typeof description === "string" && description.trim() !== "") {
        updateDetails.description = description.trim();
    }

    // Only add price if it's provided (numbers are allowed to be 0)
    if (typeof price === "number") {
        updateDetails.price = price;
    }

    if (
    name === undefined &&
    description === undefined &&
    price === undefined
    ) {
        throw new ApiError(400, "At least one field is required to update");
    }

    const product = await Product.findByIdAndUpdate(
        id,
        {
            $set : updateDetails
        },
        { new : true }
    )

    if(!product) {
        throw new ApiError(404, "Product not found ")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product updated successfully"))
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params

     // Validate MongoDB ObjectId and prevents from CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const product = await Product.findByIdAndDelete(id)

    if(!product) {
        throw new ApiError(404, "Product not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Product deleted successfully"))
})

export {
    createProduct,
    updateProduct,
    deleteProduct
}