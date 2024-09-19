import mongoose, { Types } from 'mongoose';

const reviewSchema = new mongoose.Schema({
	review: {
		type: String,
		required: [true, 'Review can not be empty'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	pharmacy: {
		type: Types.ObjectId,
		ref: 'Pharmacy',
		required: [true, 'Review must belong to a pharmacy'],
	},
	user: {
		type: Types.ObjectId,
		ref: 'User',
		required: [true, 'Review must belong to a user'],
	},
});

export const Review = mongoose.model('Review', reviewSchema);
