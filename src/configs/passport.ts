// reminder : can we convert this into oop style
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifiedCallback,
} from 'passport-jwt';
import passport from 'passport';
import dotenv from 'dotenv';
import { User } from '../models/userModel';
import catchAsyncError from '../utils/catchAsyncError';
import { Request } from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { googleConfig } from './google.config';
import { UserProfile } from '../types/types';

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
    catchAsyncError(
      async (req: Request, jwt_payload: any, done: VerifiedCallback) => {
        try {
          const user = await User.findById(jwt_payload.id);
          if (user) return done(null, user);
          return done(null, false);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  ),
);

export const configurePassport = () => {
  passport.serializeUser((user: any, done) => {
    done(null, user);
  });

  passport.deserializeUser((user: UserProfile, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: googleConfig.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const userProfile: UserProfile = {
            googleId: profile.id,
            email: profile.emails?.[0]?.value || '',
            displayName: profile.displayName,
            firstName: profile.name?.givenName,
            lastName: profile.name?.familyName,
            profilePicture: profile.photos?.[0]?.value,
          };

          // // Find existing user or create new one
          // let user = await User.findOne({ googleId: userProfile.googleId });

          // if (!user) {
          //   user = await User.create(userProfile);
          // } else {
          //   // Update existing user with latest profile info
          //   Object.assign(user, userProfile);
          //   await user.save();
          // }
          console.log(userProfile);
          return done(null, userProfile);
        } catch (error) {
          return done(error as Error, undefined);
        }
      },
    ),
  );
};

// Middleware to protect routes
export const protect = passport.authenticate('jwt', { session: false });
