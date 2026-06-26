import mongoose from 'mongoose'


const inventoryLogSchema = new mongoose.Schema(
    {
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true
        },
        changedStock : {
            type : Number,
            min : 1,
            required : true
        },
        type : {
            type : String,
            enum : ['IN', 'OUT'],
            required : true
        },
        reason : {
            type : String,
            required : true
        }
    }, 
    { timestamps : true }
)


export const InventoryLog = mongoose.model('InventoryLog', inventoryLogSchema)