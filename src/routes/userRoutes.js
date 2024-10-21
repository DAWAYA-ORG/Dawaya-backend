import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import { verifyOtp, sendNewOtp } from '../controllers/otpController.js';
import { isVerified } from '../middlewars/isVerifiedMiddleware.js';
import { protect } from '../configs/passport.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

//TODO: protect routes
// router.use(protect); // auth user

// get -> send top
router.post('/verify-otp', verifyOtp);
router.get('/new-otp', sendNewOtp);
router.use(isVerified);


router.use(protect);
router.get('/logout', logout);

// router.get(/user-data);

export default router;
