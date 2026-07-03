import mongoose from 'mongoose'


const bannerSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true,
            trim : true
        },
        image : {
            type : String,
            required : true
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Category',
            required : true
        },
        subCategory : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'SubCategory'
        },
        isActive : {
            type : Boolean,
            default : true,
        }
    }, 
    { timestamps : true }
)


export const Banner = mongoose.model("Banner", bannerSchema)