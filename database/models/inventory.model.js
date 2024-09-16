import mongoose, { Types } from "mongoose";
const schema = new mongoose.Schema({
    quantity:{
        type: Number,
        required: true,
    },

    stock: {
        type: Boolean,
        required: true,
    },

    pharmacy: {
        type:Types.ObjectId,
        ref: 'pharmacy', 
        required: true
    },

    pharmacist: {
        type:Types.ObjectId,
        ref: 'Pharmacist', 
        required: true
    },

    updateDate:{
        type: Date,
        default:Date.now(),
    },

},{timestamps:true, versionKey:false})

export const invemtory = mongoose.model ('invemtory', schema)