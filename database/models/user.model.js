import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {

    name: {
      type: String,
      maxLength: 50,
      minLength: [3, "Username is too short"],
      required: [true, "name is required"]
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
      required: [true, "password is required"],
      select: false,
    },
    passwordChangedAt: {
      type: Date,
      required: true,
    },
    imageUrl: { 
      type: string
      default: "default.jpg"
    },
    contactNumber: {
      type: String
    },
    geoLocation: { //one of them 
      type: { 
        type: String, 
        enum: ['Point'], 
        required: true 
      }, 
      coordinates: {
        type: [Number], 
        required: true }
    }, 
    locationURL: { //one of them
      type: String, 
      required: true, 
      maxLength: 255
    },
    langLocation: {
      type: Number,
      min: -180,
      max: 180,
      // FIXME: not sure about the performance of this custom function
      // validate: {
      //   validator: (lat) => {
      //     return !isNaN(lat) && isFinite(lat) && Math.abs(lat <= 180);
      //   },
      // },
    },
    latitudeLocation: {
      type: Number,
      min: -90,
      max: 90,
    },
    userReviews: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
    userPharmacies: [
      {
        type: Types.ObjectId,
        ref: "favPharmacy",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", schema);
