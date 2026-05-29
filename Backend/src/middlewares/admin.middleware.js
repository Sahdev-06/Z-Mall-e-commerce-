import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {
    
    if(req.user?.role !== "admin") {
        throw new ApiError(403, "Admin access required")
    }
    next()
    
})