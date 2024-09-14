import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    //FIXME: mongo already provide a `_id` automatically, it doesn't make sense to have another id field
    //you can use _id: false
    user_id: {
      type: Types.ObjectId,
      unique: true,
      required: [true, "user_id is required"],
    },
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
    contact_number: {
      type: Number,
      minLength: 11,
      maxLength: 11,
      validate: {
        validator: (number) => {
          return isValidEgyptianNumber(number);
        },
        message: "please enter a valid number",
      },
      required: [true, "phone number is required"],
    },
    lang_location: {
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
    latitude_location: {
      type: Number,
      min: -90,
      max: 90,
    },
    user_reviews: [
      {
        type: Types.ObjectId,
        ref: "Review",
      },
    ],
    user_pharmacies: [
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
