import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { json } from 'body-parser';

import { User } from '../models/userModel.js';
import catchAsyncError from '../utils/catchAsyncError.js';
import { createAndSendOTP } from '../utils/otpService.js';

dotenv.config();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// User signup
export const signup = catchAsyncError(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already registered' });
  }

  const newUser = await User.create({ name, email, password });

  createSendToken(newUser, 201, req, res);
});

// login
export const login = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'provide your email and password' });
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  createSendToken(user, 200, req, res);
});

// logout
export const logout = (req, res) => {
  res.clearCookie('jwt');

  res.status(200).json({ status: 'success' });
};
