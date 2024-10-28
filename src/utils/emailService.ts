import transporter from '../configs/emailConfig';

export const sendOTPEmail = async (
  email: string,
  otp: string,
): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It is valid for 30 seconds.`,
  };

  await transporter.sendMail(mailOptions);
};
