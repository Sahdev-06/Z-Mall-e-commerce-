import mongoose, { Mongoose } from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        orderItems : [
            {
                product : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Product',
                    required : true
                },
                quantity : {
                    type : Number,
                    required : true,
                    min : 1
                },
                price : {
                    type : Number,
                    min : 0,
                    required : true
                }, 
                productName : {
                    type : String,
                    trim : true,
                    required : true
                },
                productImage : {
                    type : String,
                    required : true
                }
            }
        ],
        shippingAddress : {
            fullName : {
                type : String,
                required : true,
                trim : true
            },
            phoneNumber : {
                type : String,
                required : true,
                trim : true
            },
            street : {
                type: String,
                required: true,
                trim : true
            },
            city : {
                type: String,
                required: true,
                trim: true
            },
            state : {
                type: String,
                required: true,
                trim: true
            },
            postalCode : {
                type: String,
                required: true,
                trim: true
            },
            landmark : {
                type: String,
                trim: true
            },
            addressType : {
                type: String,
                enum: ['Home', 'Work'],
                default: 'Home',
                required: true
            },
        },
        itemsPrice : {
            type : Number,
            min : 0,
            required : true
        },
        shippingFee : {
            type : Number,
            min : 0,
            default : 0
        },
        discountAmount : {
            type : Number,
            min : 0,
            default : 0
        },
        totalAmount : {
            type : Number,
            min : 0,
            required : true
        },
        orderStatus : {
            type : String,
            enum : ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default : 'Pending',
            required : true
        },
        paymentStatus : {
            type : String,
            enum : ['Pending', 'Paid', 'Failed', 'Refunded'],
            default : 'Pending',
            required : true
        },
        paymentMethod : {
            type : String,
            enum : ['COD', 'Razorpay', 'Stripe', 'UPI', 'Card'],
            required : true
        },
        paidAt : {
            type : Date
        },
        deliveredAt : {
            type : Date
        },
        cancelledAt : {
            type : Date
        }
    }, 
    { timestamps : true }
);



export const Order = mongoose.model("Order", orderSchema)