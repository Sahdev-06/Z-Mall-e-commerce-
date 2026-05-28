import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateAccessToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
    
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generateing access and refresh Token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - check empty fields
    // check if user already exist
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullName, email, phone, password, role } = req.body

    if(
        [fullName, email, phone, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or : [{ email }, { phone }]
    })

    if(existedUser) {
        throw new ApiError(409, "user with email or phone no. already exists")
    }

    const user = await User.create({
        fullName,
        email,
        phone,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {
    // get data from frondend
    // validation - email or phone
    // find user 
    // check password
    // generate tokens 
    // set token to cookies
    // return response

    const { email, phone, password} = req.body

    if(!email && !phone) {
        throw new ApiError(400, "email or phone is required")
    }

    const user = await User.findOne({
        $or : [{ email }, { phone }]
    })

    if(!user) {
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUsern = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .cookie("accessToken" , accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUsern, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : { refreshToken : undefined}
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out Successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if(!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }

        if(incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
        }

        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly : true,
            secure : true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { accessToken, refreshToken },
                "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}