import mongoose, { Types } from "mongoose";
import validator from "validator";

const pharmacySchema = new mongoose.Schema({
    name:{
        type:String,
        unique: [true, 'name is required'],
        required: true,
        minLength: [2, 'too short pharmacy name']
    },
    email:{
        type:String,
        unique: [true, 'email is required'],
        required: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6
    },

    /*passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
          validator: function (el) {
            return el === this.password;
          },
          message: "Passwords are not the same!",
        },
    },*/
    passwordChangedAt: Date,
    createdBy:{
        type:Types.ObjectId,
        ref:"Pharmacist"
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50
    },
    addresses: [
        {
            street: String,
            city: String,
            state: String,
            phones: [String], // Array to hold multiple phone numbers per address
        }
    ],
    openingHours: [
        {
            day: {
                type: String,
                enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                required: true
            },
            open: {
                type: String,
                required: true
            },
            close: {
                type: String,
                required: true
            }
        }
    ],
    /*geoLocation: { //one of them
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },*/
    locationURL:{ //one of them
         type: String,
         required: true,
          maxLength: 255
    },
    logo: String,
    review: {
        type: Types.ObjectId,
        ref: "Review",
      },
    rateAvg:{
        type:Number,
        min:0,
        max:5,
        set: (val) => Math.round(val * 10) / 10,
    },
    ratingQuantity:{
        type:Number,
        default:0
    }

},{timestamps:true, versionKey:false})

export const Pharmacy = mongoose.model ('Pharmacy', pharmacySchema)
