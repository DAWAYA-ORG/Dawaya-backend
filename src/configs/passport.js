import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../models/userModel.js';
import catchAsyncError from '../utils/catchAsyncError.js';

dotenv.config();

// JWT strategy options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Configure passport.js to use the JWT strategy
passport.use(
  new JwtStrategy(
    opts,
    catchAsyncError(async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
      } catch (error) {
        return done(error);
      }
    }),
  ),
);

// Middleware to protect routes
export const protect = passport.authenticate('jwt', { session: false });
