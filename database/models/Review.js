import mongoose, { Types } from "mongoose";

const userSchema = new Schema({
  // ... user fields
});

const reviewSchema = new Schema({
  comment: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);
