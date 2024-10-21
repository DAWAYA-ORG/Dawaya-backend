import speakeasy from 'speakeasy';

export const generateOTP = (secret) =>
  speakeasy.totp({
    secret,
    encoding: 'base32',
  });

export const verifyOtp = (secret, token) =>
  speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1, // Allows for slight timing variations
  });
