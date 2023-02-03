const apiResponse = require("../helpers/apiResponse");
const TransactionsModel = require("../models/TransactionsModel");
const TransactionTypesModel = require("../models/TransactionTypesModel");
const mongoose = require("mongoose");

module.exports = {
	addTrasactionType: async (req, res) => {
		try {
			let { tx_type_name, tx_type_description } = req.body;

			let transactionType = await new TransactionTypesModel({
				tx_type_name,
				tx_type_description,
			}).save();

			return apiResponse.successResponseWithData(
				res,
				"Transaction type added successfully.",
				transactionType,
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, error);
		}
	},

	approveDepositTransaction: async (req, res) => {
		try {
			let { transaction_id } = req.body;

			let transaction = await TransactionsModel.findOne({
				_id: mongoose.Types.ObjectId(transaction_id),
			});

			if (!transaction) {
				return apiResponse.ErrorResponse(res, "Transaction not found.");
			}

			transaction.status = "success";
			transaction = await transaction.save();

			return apiResponse.successResponseWithData(
				res,
				"Transaction approved successfully.",
				transaction,
			);
		} catch (error) {
			return apiResponse.ErrorResponse(res, `Internal Server Error!`);
		}
	},
};
