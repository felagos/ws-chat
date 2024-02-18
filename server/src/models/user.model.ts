import { Schema, model } from "mongoose";

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true
	},
	online: {
		type: Boolean,
		default: false
	},
});

UserSchema.method('toJson', function () {
	const { password, ...object } = this.toObject();
	return object;
});

export const User = model('User', UserSchema);