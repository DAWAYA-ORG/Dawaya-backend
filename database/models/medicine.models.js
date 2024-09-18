import mongoose, { Types } from "mongoose";
import validator from "validator";

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      minLength: [3, "Name is too short"],
      maxlength: [50, "Name should not exceed 100 characters"],
      index: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    dosage: {
      type: String,
      maxlength: [50, "Dosage should not exceed 50 characters"],
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      maxlength: [255, "Image URL should not exceed 255 characters"],
      required: [true, "Image is required"],
      validate: {
        validator: function (value) {
          return validator.isURL(value);
        },
        message: "Invalid URL format",
      },
    },
    manufacturer: {
      type: String,
      maxlength: [100, "Manufacturer should not exceed 100 characters"],
      default: "",
    },
    inventory: {
      type: Types.ObjectId,
      ref: "Inventory",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Medicine = mongoose.model("Medicine", medicineSchema);
