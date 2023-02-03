const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const MarginHistorySchema = new Schema(
	{
		game_id: {
			type: Schema.Types.ObjectId,
			ref: "Games",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		tx_id: {
			type: Schema.Types.ObjectId,
			ref: "transactions",
			required: true,
		},
		tx_type_id: Schema.Types.ObjectId,
		ref: "transaction_types",
		required: true,
	},
	{ timestamps: true, versionKey: false, collection: "margin_history" },
);

module.exports = mongoose.model("MarginHistoryModel", MarginHistorySchema);
