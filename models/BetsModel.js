const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const BetsSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		game_id: {
			type: Schema.Types.ObjectId,
			ref: "Games",
			required: true,
		},
		bet_amount: {
			type: Number,
			required: true,
		},
		bet_colour: {
			type: String,
			required: false,
			default: null,
		},
		bet_number: {
			type: Number,
			required: false,
		},
		bet_type: {
			type: String,
			required: true,
			enum: ["colour", "number"],
			default: "colour",
		},
	},
	{ timestamps: true, versionKey: false, collection: "bets" },
);

module.exports = mongoose.model("BetsModel", BetsSchema);
