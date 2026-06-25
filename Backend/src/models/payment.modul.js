import mongoose from 'mongoose'


const paymentSchema = new mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        },
        order : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Order',
            required : true
        },
        totalAmount : {
            type : Number,
            min : 0,
            required : true
        },
        paymentMethod : {
            type : String,
            enum : ['COD', 'Razorpay', 'Stripe', 'UPI', 'Card'],
            required : true
        },
        paymentStatus : {
            type : String,
            enum : ['Pending', 'Paid', 'Failed', 'Refunded'],
            required : true
        },
        transactionId : {
            type : String
        },
        paidAt : {
            type : Date
        }
    }, 
    { timestamps : true }
)


export const Payment = mongoose.model("Payment", paymentSchema)