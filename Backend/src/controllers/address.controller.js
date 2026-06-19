import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Address } from "../models/address.model.js";
import mongoose from "mongoose";


const createAddress = asyncHandler(async (req, res) => {
    let {  
        fullName, 
        phoneNumber, 
        street, 
        city, 
        state, 
        postalCode, 
        landmark,
        addressType, 
        isDefault 
    } = req.body;

    if(
        [fullName, phoneNumber, street, city, state, postalCode, addressType]
            .some(field => String(field)?.trim() === "")
    ) {
        throw new ApiError(400, "All required fields must be filled");
    }

    const { _id: userId } = req.user;

    const existedAddressCount = await Address.countDocuments({ user: userId });

    if(existedAddressCount >= 5) {
        throw new ApiError(400, "You can only have a maximum of 5 addresses");
    }

    if(existedAddressCount === 0) {
        isDefault = true;
    } 

    const address = await Address.create({
        user: userId,
        fullName,
        phoneNumber,
        street,
        city,
        state,
        postalCode,
        landmark,
        addressType,
        isDefault
    });

    return res
    .status(201)
    .json(new ApiResponse(201, address, "Address created successfully"));
});

const updateAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const {  
        fullName, 
        phoneNumber, 
        street, 
        city, 
        state, 
        postalCode, 
        landmark,
        addressType,
        isDefault 
    } = req.body;

    if(
        [fullName, phoneNumber, street, city, state, postalCode, addressType]
            .some(field => String(field)?.trim() === "")
    ) {
        throw new ApiError(400, "All required fields must be filled");
    }

    const updatedDetails = {}

    if(fullName) updatedDetails.fullName = fullName;
    if(phoneNumber) updatedDetails.phoneNumber = phoneNumber;
    if(street) updatedDetails.street = street; 
    if(city) updatedDetails.city = city;
    if(state) updatedDetails.state = state;
    if(postalCode) updatedDetails.postalCode = postalCode;
    if(landmark) updatedDetails.landmark = landmark;
    if(addressType) updatedDetails.addressType = addressType;
    if(isDefault !== undefined) updatedDetails.isDefault = isDefault;

    const address = await Address.findByIdAndUpdate(
        id,
        { $set: updatedDetails },
        { new: true }
    )

    if(!address) {
        throw new ApiError(404, "Address not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, address, "Address updated successfully"));
});

const deleteAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const address = await Address.findByIdAndDelete(id);

    if(!address) {
        throw new ApiError(404, "Address not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, null, "Address deleted successfully"));
});

const getAllAddresses = asyncHandler(async (req, res) => {
    const { _id: userId } = req.user;

    const addresses = await Address.find({ user: userId });

    if(!addresses || addresses.length === 0) {
        throw new ApiError(404, "No addresses found for this user");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, addresses, "Addresses retrieved successfully"));
})

const getAddressById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const address = await Address.findById(id);

    if(!address) {
        throw new ApiError(404, "Address not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, address, "Address retrieved successfully"));
});

const setDefaultAddress = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { _id: userId } = req.user;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid address ID");
    }

    const address = await Address.findById(id);

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    // Ownership check
    if (address.user.toString() !== userId.toString()) {
        throw new ApiError(
            403,
            "You are not authorized to modify this address"
        );
    }

    // If already default, no need to continue
    if (address.isDefault) {
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Address is already the default address"
            )
        );
    }

    // Remove default from all user's addresses
    await Address.updateMany(
        { user: userId },
        { $set: { isDefault: false } }
    );

    // Set selected address as default
    address.isDefault = true;
    await address.save();

    return 
    res.status(200)
    .json(
        new ApiResponse(
            200,
            address,
            "Default address set successfully"
        )
    );
});

export {
    createAddress,
    updateAddress,
    deleteAddress,
    getAllAddresses,
    getAddressById,
    setDefaultAddress
}
   
