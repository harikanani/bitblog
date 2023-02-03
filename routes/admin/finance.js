const express = require("express");
const adminController = require("../../controllers/adminController");

const router = express.Router();

// add transaction type
router.post("/addTransactionType", adminController.addTrasactionType);

// approve deposite transaction
router.post(
	"/approveDepositTransaction",
	adminController.approveDepositTransaction,
);

module.exports = router;
