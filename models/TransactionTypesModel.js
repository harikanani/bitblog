const mongoose = require("mongoose"),
	Schema = mongoose.Schema;

const TransactionTypesSchema = new Schema(
	{
		tx_type_name: {
			type: String,
			required: true,
			unique: true,
		},
		tx_type_description: {
			type: String,
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
	{ timestamps: true, versionKey: false, collection: "transaction_types" },
);

module.exports = mongoose.model("TransactionTypes", TransactionTypesSchema);
