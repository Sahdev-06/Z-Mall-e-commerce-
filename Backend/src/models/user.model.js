import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email"]   // checks email format 
        },
        phone: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["customer", "admin"],
            default: "customer"
        },
        isEmailVerified: {
            type: Boolean,
            default: false
            // Email verified status
        },

        isBlocked: {
            type: Boolean,
            default: false
            // User blocked status
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
)

export const User = mongoose.model("User", userSchema)