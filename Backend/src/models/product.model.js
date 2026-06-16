import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        description : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true
        },
        images : [
            {
                type : String,
                required : true
            }
        ],
        discount : {
            type : Number,
            default : 0
        },
        stock : {
            type : Number,
            default : 0
            // Number of items available in inventory
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required : true
        },
        isActive : {
            type : Boolean,
            default : true
            // Controls whether product is visible to users or hidden
        }
    }, 
    { timestamps : true }
)


export const Product = mongoose.model("Product", productSchema)