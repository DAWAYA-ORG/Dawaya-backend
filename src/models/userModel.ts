import mongoose, { Document, Schema } from 'mongoose';
import { BaseUser, IBaseUser } from './common/baseUserModel';

export interface IUser extends IBaseUser {
  isActive: Boolean;
}



const userSchema = new Schema<IUser>({
  isActive: { type: Boolean, required: true, default: true },
});


export const User = BaseUser.discriminator('User', userSchema);
