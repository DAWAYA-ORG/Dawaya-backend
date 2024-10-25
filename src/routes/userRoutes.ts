import express, { Request, Response, NextFunction } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { verifyUserOTP, sendNewOtp } from '../controllers/otpController';
import { isVerified } from '../middlewars/isVerifiedMiddleware';
import { protect } from '../configs/passport';

const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);

// 1- reset-passwor -> confirm email and send email with token.

router.use(protect); // auth user

router.post('/verify-otp', verifyUserOTP);
router.get('/new-otp', sendNewOtp);

router.use(isVerified);
router.get('/logout', logout);


export default router;
