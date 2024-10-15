import mongoose, { Types } from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  name: {
    type: String,
    maxLength: 50,
    minLength: [3, 'Username is too short'],
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    lowercase: true,
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} isn't a valid email`,
    },
  },
  password: {
    type: String,
    minLength: [8, 'Password must be at least 8 characters long'],
    required: [true, 'password is required'],
    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  imageUrl: {
    type: String,
    default: 'default.jpg',
  },
  contactNumber: {
    type: String,
    default: 'xxxx',
  },
});

const User = mongoose.model('User', userSchema);
export default User;
