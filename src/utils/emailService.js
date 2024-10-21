import transporter from '../configs/emailConfig.js';

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}. It is valid for 30 seconds.`,
  };

  await transporter.sendMail(mailOptions);
};
