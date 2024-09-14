import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {

    name: {
      type: String,
      maxLength: [100, "name can't be more than 100 characters"],
      required: [true, "name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      maxLength: [100, "email can't be more than 100 characters"],
      minLength: [3, "email can't be less than 3 characters"],
      required: [true, "email is required"],
      trim: true,
    },
    password: {
      type: String,
      maxLength: [100, "password can't be more than 100 characters"],
      minLength: [8, "password can't be less than 8 characters"],
      required: [true, "password is required"],
    },
    contactNumber: {
      type: Number,
      required: [true, "phone number is required"],
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
        ref: "Pharmacy",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", schema);
