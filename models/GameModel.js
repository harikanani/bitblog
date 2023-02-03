const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const GameSchema = new Schema(
	{
		gameId: {
			type: String,
			required: true,
			unique: true,
		},
		gameStartTime: {
			type: Date,
			required: true,
		},
		gameEndTime: {
			type: Date,
			required: true,
		},
		gamePoreTime: {
			type: Date,
			required: true,
		},
		gameResultTime: {
			type: Date,
			required: true,
		},
		gameStatus: {
			type: String,
			required: true,
		},
		gameResult: {
			type: String,
			required: true,
		},
		gameWinner: {
			type: String,
			required: true,
		},
		gamePlayers: {
			type: Array,
			required: true,
		},
		gamePlayersCount: {
			type: Number,
			required: true,
		},
		winningColour: {
			type: String,
			required: false,
		},
		winningNumber: {
			type: Number,
			required: false,
		},
		is_deleted: {
			type: Boolean,
			required: true,
			default: false,
		},
		is_active: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{ timestamps: true, versionKey: false, collection: "games" },
);

module.exports = GameModel = mongoose.model("games", GameSchema);
