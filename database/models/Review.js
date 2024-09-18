import mongoose, { Types } from 'mongoose';

const reviewSchema = new mongoose.Schema({
  review: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true, versionKey: false });

export const Review = mongoose.model('Review', reviewSchema);
