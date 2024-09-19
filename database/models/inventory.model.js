import mongoose, { Types } from "mongoose";
const inventorySchema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true,
        min : [0,"Quantity cannot be negative"],     //validation added
    },

    stock: {
        type: Boolean,
        required: true,
        default : false,
    },

    pharmacy: {
        type:Types.ObjectId,
        ref: 'Pharmacy', 
        required: true
    },

    pharmacist: {
        type:Types.ObjectId,
        ref: 'Pharmacist', 
        required: true
    },
},{timestamps:true, versionKey:false})

export const Inventory = mongoose.model ('Inventory', inventorySchema)