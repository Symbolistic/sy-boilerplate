import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		default: 'User',
	},
	email: {
		type: String,
		unique: [true, 'Email already exists'],
		required: [true, 'Email is required!'],
	},
	image: {
		type: String,
	},
	hasAccess: {
		type: Boolean,
		default: false,
	},
	customerId: {
		type: String,
	},
	priceId: {
		type: String,
	},
});

const User = models.User || model('User', UserSchema);

export default User;
