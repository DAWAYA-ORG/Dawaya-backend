import speakeasy from 'speakeasy';
import { generateOTP } from '../configs/otpConfig.js';
import { sendOTPEmail } from './emailService.js';

// Function to generate OTP and send via email
export const createAndSendOTP = async (user, res) => {
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
