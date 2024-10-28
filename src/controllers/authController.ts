import { NextFunction, Request, Response, response } from 'express';

import { User } from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import { createAndSendOTP } from '../utils/otpService';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendOTPEmail } from '../utils/emailService';

dotenv.config();

const signToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (
  user: any,
  statusCode: number,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
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

  next();
};

// User signup
export const signup = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please provide all fields' });
      return next();
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email is already registered' });
      return next();
    }

    const newUser = await User.create({ name, email, password });

    createSendToken(newUser, 201, req, res, next);
  },
);

// login
export const login = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'provide your email and password' });
      return next();
    }
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password))) {
      res.status(401).json({ message: 'Incorrect email or password' });
      return next();
    }

    createSendToken(user, 200, req, res, next);
  },
);

//request reset password
export const RequestResetPassword = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: 'provide your email' });
      return next();
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User is not found' });
      return next();
    }

    await createAndSendOTP(user, res);
  },
);

// logout
export const logout = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.clearCookie('jwt');

  res.status(200).json({ status: 'success' });

  next();
};
