// reminder : can we convert this into oop style
import speakeasy from 'speakeasy';

export const generateOTP = (secret: string) =>
  speakeasy.totp({
    secret,
    encoding: 'base32',
  });

export const verifyOtp = (secret: string, token: string) =>
  speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // Allows for slight timing variations
  });
