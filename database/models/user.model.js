import { model, Schema, Types } from "mongoose";
import { isEmail } from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: [3, "Username is too short"],
      required: [true, "name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
      lowercase: true,
      validate: {
        validator: (email) => {
          return isEmail(email);
        },
        message: (props) => `${props.value} isn't a valid email`,
      },
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
      type: string,
      default: "default.jpg",
    },
    contactNumber: {
      type: String,
    },
    /*geoLocation: {
      //one of them
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },*/
    locationURL: {
      //one of them
      type: String,
      required: true,
      maxLength: 255,
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
      enum: ["admin", "user","pharmacist"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const User = model("User", userSchema);
