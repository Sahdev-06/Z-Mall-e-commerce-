import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            trim : true
        },
        slug : {
            type : String,
            required : true,
        },
        category : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required : true
        },
        isActive : {
            type : Boolean,
            default : true
            // Controls whether subcategory is visible to users or hidden
        }
    }, 
    { timestamps: true }
);


export const SubCategory = mongoose.model("SubCategory", subCategorySchema);