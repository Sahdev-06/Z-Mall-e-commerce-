import mongoose from 'mongoose'


const couponSchema = new mongoose.Schema(
    {
        code : {
            type : String,
            required : true,
            uppercase : true,
            trim: true,
            unique: true
        },
        discount : {
            type : Number,
            min : 1,
            required : true
        },
        discountType : {
            type : String,
            enum : ['Percentage', 'Fixed'],
            required : true
        },
        minimumOrderAmount : {
            type : Number,
            min : 0,
            required : true
        },
        expiryDate : {
            type : Date,
            required : true
        },
        isActive : {
            type : Boolean,
            default : true
        }
    }, 
    { timestamps : true }
)


export const Coupon = mongoose.model("Coupon", couponSchema)