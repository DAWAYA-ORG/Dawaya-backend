import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const { isEmail } = validator;

const userSchema = new mongoose.Schema({
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
});

userSchema.pre('save', async function (next) {
  // If the password field has been modified, hash the password
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export const User = mongoose.model('User', userSchema);
