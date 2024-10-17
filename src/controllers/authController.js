import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';
import catchAsyncError from '../utils/catchAsyncError.js';

dotenv.config();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  user.password = undefined;

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
    return res.status(400).json({ message: 'Please provide your email and password' });
  }
  const user = await User.findOne({ email }).select( '+password' );
});
  if (!user || !( await user.correctPassword(password, user.password))) {
    return res.status(401).send({ message: 'Incorrect email or password' });
  }
  reateSendToken(user, 200, req, res);

  // logout
  export const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),  
      httpOnly: true,
    });
  
    res.status(200).json({ status: 'success' });
  };
  


