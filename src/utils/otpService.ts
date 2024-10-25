import speakeasy from 'speakeasy';
import { generateOTP } from '../configs/otpConfig';
import { sendOTPEmail } from './emailService';
import { Response } from 'express';
import { Document } from 'mongoose';

interface User extends Document<User> {
  email: string;
  otpSecret: string;
  save: () => Promise<this>;
}

// Function to generate OTP and send via email
export const createAndSendOTP = async (user: User, res: Response): Promise<void> => {
  const secret = speakeasy.generateSecret();
  const otp = generateOTP(secret.base32);

  user.otpSecret = secret.base32;
  await user.save();

  await sendOTPEmail(user.email, otp);

  res.status(200).json({
    status: 'success',
    message: 'OTP has been sent to your email.',
  });
};
