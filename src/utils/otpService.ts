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

// Function to generate and verify 6-digit OTP
export const createAndSendOTP = async (user: User, res: Response): Promise<void> => {
  const secret = speakeasy.generateSecret();

  // Generate 6 digit OTP
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 6,
    step: 300 // 5 minute validity
  });

  user.otpSecret = secret.base32;

  await user.save();

  await sendOTPEmail(user.email, otp);
  res.status(200).json({
    status: 'success',
    message: 'A 6-digit OTP has been sent to your email.'
  });
};

export const verifyOtp = async (otp: string, secret: string): Promise<boolean> => {
  // Verify generated OTP
  const isValid = speakeasy.totp.verify({
    secret: secret,
    encoding: 'base32',
    token: otp,
    digits: 6,
    step: 300
  });

  if (!isValid) {
    throw new Error('OTP generation failed verification');
  }

  return isValid;
};

