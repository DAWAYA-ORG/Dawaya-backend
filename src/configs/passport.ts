// reminder : can we convert this into oop style
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import { Request } from 'express';

dotenv.config();

// JWT strategy options
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req: Request) => req.cookies.jwt,
    ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: process.env.JWT_SECRET as string,
};

// Configure passport.js to use the JWT strategy
passport.use(
  new JwtStrategy(
    { ...opts, passReqToCallback: true },
    catchAsyncError(async (req: Request, jwt_payload: any, done: VerifiedCallback) => {
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) return done(null, user);
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }),
  ),
);

// Middleware to protect routes
export const protect = passport.authenticate('jwt', { session: false });
