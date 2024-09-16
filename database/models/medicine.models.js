import mongoose, { Types } from "mongoose";

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      maxlength: [100, "Name should not exceed 100 characters"],
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
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      maxlength: [255, "Image URL should not exceed 255 characters"],
    },
    manufacturer: {
      type: String,
      maxlength: [100, "Manufacturer should not exceed 100 characters"],
    },
    inventory: {
      type: Types.ObjectId,
      ref: "Inventory",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
