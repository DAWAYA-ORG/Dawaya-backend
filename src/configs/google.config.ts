
// import {User} from '../models/userModel'; // Mongoose User model with types

export const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: 'http://localhost:3000/api/v1/users/google/callback',
  scope: ['email', 'profile'],
};
