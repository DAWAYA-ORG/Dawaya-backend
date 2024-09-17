import mongoose, { Types } from "mongoose";
import validator from "validator";

const pharmacistSchema = new mongoose.Schema(
  role: {
type: String,
default: 'pharmacist'
},
  {
    licenseNumber: {
      type: String,
      required: [true, "License number is required"],
      unique: true,
      maxLength: 50,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [3, "Username is too short"],
      maxLength: 50,
    },
    imageUrl:{
      type:string
      default:"default.jpg"
  },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },
    pharmacy: {
      type: Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    Inventory: {
      type: Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

pharmacistSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash password logic here
  }
  next();
});

pharmacistSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  // Implement password comparison logic
  return false;
};

export const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);
