const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phone: {
			type: String,
			required: true,
			unique: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		addressLineOne: {
			type: String,
			required: true,
		},
		addressLineTwo: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false, collection: "users" },
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
