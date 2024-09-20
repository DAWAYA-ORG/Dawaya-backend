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
			validator: email => {
				return isEmail(email);
			},
			message: props => `${props.value} isn't a valid email`,
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
		type: string,
		default: 'default.jpg',
	},
	contactNumber: {
		type: String,
	},
	geoLocation: {
		//one of them
		type: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	locationURL: {
		//one of them
		type: String,
		required: true,
		maxLength: 255,
	},
	userPharmacies: [
		{
			type: Types.ObjectId,
			ref: 'FavPharmacy',
		},
	],
});

export const User = mongoose.model('User', userSchema);
