import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  pharmacy: {
    type: Types.ObjectId,
    ref: "pharmacy",
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  timestamps: true,
});

export const favPharmacy = mongoose.model("favPharmacy", schema);
