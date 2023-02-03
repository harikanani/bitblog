const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const TransactionsSchema = new Schema(
	{
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		game_id: {
			type: Schema.Types.ObjectId,
			ref: "Games",
		},
		bet_id: {
			type: Schema.Types.ObjectId,
			ref: "Bets",
		},
		tx_type_id: {
			type: Schema.Types.ObjectId,
			ref: "transaction_types",
			required: true,
		},
		user_tx_id: {
			type: String,
			required: true,
			unique: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "pending",
			enum: ["pending", "success", "failed"],
		},
		type: {
			type: String,
			required: true,
			enum: ["debit", "credit"],
		},
		description: {
			type: String,
			required: true,
		},
		transactionDate: {
			type: Date,
			required: true,
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
	{ timestamps: true, versionKey: false, collection: "transactions" },
);

module.exports = mongoose.model("Transactions", TransactionsSchema);
