import { User } from '../models/userModel.js';
import { verifyOtp } from '../configs/otpConfig.js';
import { createAndSendOTP } from '../utils/otpService.js';

// Function to verify OTP
export const verifyUserOTP = async (req, res) => {
  const userId = req.user._id;
  const { otp } = req.body;

  const user = await User.findById(userId);

  if (!user || !user.otpSecret) {
    throw new Error('Invalid user or OTP');
  }

  const isVerified = verifyOtp(user.otpSecret, otp);

  if (!isVerified) {
    throw new Error('Invalid OTP');
  }

  user.otpSecret = undefined;
  user.verifyEmail = true;
  await user.save();

  // redirect ->
  res.send({
    status: 'success',
    message: 'User is verfied',
  });
};

export const sendNewOtp = async (req, res) => {
  const { user } = req;
  await createAndSendOTP(user, res);
};
