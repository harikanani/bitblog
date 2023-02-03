const TransactionsModel = require("../models/TransactionsModel");
const TransactionTypeModel = require("../models/TransactionTypeModel");
const mongoose = require("mongoose");

module.exports = {
	generateRandomId: (length) => {
		let result = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}
		return result;
	},

	getUserBalance: async (user_id) => {
		try {
			if (!user_id) {
				return "User Not Found!!";
			}

			let debitTransactions = await TransactionsModel.aggregate([
				{
					$match: {
						user_id: mongoose.Types.ObjectId(user_id),
						status: {
							$in: ["success"],
						},
						type: "debit",
					},
				},
				{
					$group: {
						_id: null,
						total: {
							$sum: "$amount",
						},
					},
				},
			]);

			let creditTransactions = await TransactionsModel.aggregate([
				{
					$match: {
						user_id: mongoose.Types.ObjectId(user_id),
						status: {
							$in: ["success"],
						},
						type: "credit",
					},
				},
				{
					$group: {
						_id: null,
						total: {
							$sum: "$amount",
						},
					},
				},
			]);

			debitTransactions = debitTransactions.length
				? debitTransactions[0].total
				: 0;
			creditTransactions = creditTransactions.length
				? creditTransactions[0].total
				: 0;

			return creditTransactions - debitTransactions;
		} catch (error) {
			return `Error: Something went wrong!!!`;
		}
	},

	findTransactionTypeID: async (type) => {
		try {
			let transactionType = await TransactionTypeModel.findOne({
				tx_type_name: type,
				is_active: true,
				is_deleted: false,
			});
		} catch (error) {
			return `Error: Something went wrong!!!`;
		}
	},
};
