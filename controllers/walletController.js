const mongoose = require("mongoose");
const apiResponse = require("../helpers/apiResponse");
const TransactionTypesModel = require("../models/TransactionTypesModel");
const TransactionsModel = require("../models/TransactionsModel");
const moment = require("moment");

moment.tz.setDefault("Asia/Kolkata");

module.exports = {
	deposite: async function (req, res) {
		try {
			let { amount, user_tx_id, user_id } = req.body;

			if (!amount || !user_tx_id || !user_id) {
				return apiResponse.validationError(
					res,
					"Invalid request. please provide all required fields.",
				);
			}

			// set minimum amount to deposit
			if (amount < 100) {
				return apiResponse.validationError(
					res,
					"Minimum amount should be 100.",
				);
			}

			let transactionType = await TransactionTypesModel.findOne({
				tx_type_name: "loadWallet",
			});

			if (!transactionType) {
				return apiResponse.ErrorResponse(
					res,
					"Transaction type not found.",
				);
			}

			try {
				let transaction = await new TransactionsModel({
					user_id: mongoose.Types.ObjectId(user_id),
					amount,
					tx_type_id: transactionType._id,
					user_tx_id,
					status: "pending",
					type: "credit",
					description: "Wallet load request.",
					transactionDate: moment(),
				}).save();

				return apiResponse.successResponseWithData(
					res,
					"load wallet request successful.",
					transaction,
				);
			} catch (error) {
				return apiResponse.validationError(res, "Transaction failed.");
			}
		} catch (error) {
			return apiResponse.ErrorResponse(res, "Inernal Server Error.");
		}
	},

	getWallet: async function (req, res) {},

	getBalance: async function (req, res) {
		try {
			let { user_id } = req.body;

			if (!user_id) {
				return apiResponse.validationError(
					res,
					"Invalid request. please provide all required fields.",
				);
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

			let balance = creditTransactions - debitTransactions;

			return apiResponse.successResponseWithData(
				res,
				"Balance fetched successfully.",
				{
					balance,
				},
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, "Inernal Server Error.");
		}
	},
};
