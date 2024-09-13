import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, 'name is required'],
        required: true,
        minLength: [2, 'too short pharmacy name']
    },   
    email:{
        type:String,
        unique: [true, 'email is required'],
        required: true
    }, 
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6
    },
    passwordChangedAt: Date,
    isBlocked:{
        type:Boolean,
        default: false,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"Pharmacist"
    },
    licenceNumber: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    addresses: [{
        city: { type: String, required: true },
        phone: { type: String, required: true},
        street: { type: String }
    }],
    openingHours: {
        type: String,
        required: true
    },
    geoLocation: { //one of them
        type: {
          type: String, 
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    locationURL:{ //one of them
         type: String,
         required: true,
          maxLength: 255 
    },
    logo: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
 
},{timestamps:true, versionKey:false})

export const Pharmacy = mongoose.model ('Pharmacy', schema)