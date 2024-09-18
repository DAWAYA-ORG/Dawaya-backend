import mongoose, { Types } from "mongoose";

const favPharmacySchema = new mongoose.Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacy: {
      type: Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const favPharmacy = mongoose.model("favPharmacy", favPharmacySchema);
