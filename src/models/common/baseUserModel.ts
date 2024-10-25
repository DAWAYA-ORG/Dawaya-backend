import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { isEmail } = validator;

export interface IBaseUser extends Document {
  role: 'admin' | 'user';
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  imageUrl?: string;
  contactNumber?: string;
  correctPassword(candidatePassword: string): Promise<boolean>;
  isVerified: boolean;
  otpSecret?: string;
}

const userSchema = new Schema<IBaseUser>({
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  name: {
    type: String,
    maxLength: 50,
    minLength: [3, 'Username is too short'],
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minLength: [8, 'Password must be at least 8 characters long'],
    required: [true, 'password is required'],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  imageUrl: {
    type: String,
    default: 'default.jpg',
  },
  contactNumber: {
    type: String,
    default: 'xxxx',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  otpSecret: {
    type: String,
    select: false,
  },
});

userSchema.pre<IBaseUser>('save', async function (next) {
  // If the password field has been modified, hash the password
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const BaseUser = mongoose.model<IBaseUser>('User', userSchema);
