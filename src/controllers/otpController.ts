import { Request, Response, NextFunction } from 'express';
import { User } from '../models/userModel';
import { verifyOtp } from '../configs/otpConfig';
import { createAndSendOTP } from '../utils/otpService';

// Function to verify OTP
export const verifyUserOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req.user as any)._id;
    const { otp } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('Invalid user');
    }

    const otpSecret: string = user.get('otpSecret') as string;

    if (!otpSecret) {
      throw new Error('Invalid OTP');
    }

    const isVerified = verifyOtp(otpSecret, otp);

    if (!isVerified) {
      throw new Error('Invalid OTP');
    }

    user.set('otpSecret', undefined);
    user.set('verifyEmail', true);
    await user.save();

    // redirect ->
    res.send({
      status: 'success',
      message: 'User is verified',
    });
  } catch (error) {
    next(error);
  }
};

export const sendNewOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user as any;
    await createAndSendOTP(user, res);
  } catch (error) {
    next(error);
  }
};
