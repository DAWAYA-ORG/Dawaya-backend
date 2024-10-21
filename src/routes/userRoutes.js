import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import { protect } from '../configs/passport.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.use(protect);
router.get('/logout', logout);

export default router;
