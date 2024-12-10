import express, { Request, Response, NextFunction } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { verifyUserOTP, sendNewOtp } from '../controllers/otpController';
import { isVerified } from '../middlewars/isVerifiedMiddleware';
import { protect } from '../configs/passport';
import passport from 'passport';
// import { googleConfig } from '../configs/google.config';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile']}),
);

// 1- reset-passwor -> confirm email and send email with token.

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: true,
  }),
  (req, res) => {
    // Successful authentication
    res.redirect('/dashboard');
  },
);
router.use(protect); // auth user


router.post('/verify-otp', verifyUserOTP);
router.get('/new-otp', sendNewOtp);

router.use(isVerified);
router.get('/logout', logout);

export default router;
