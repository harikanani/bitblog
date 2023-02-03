const express = require("express");
const walletController = require("../controllers/walletController");

const router = express.Router();

router.post("/deposite", walletController.deposite);

router.post("/getWallet", walletController.getWallet);

router.post("/getbalance", walletController.getBalance);

// router.post("/getWalletHistory", walletController.getWalletHistory);

// router.post("/getWalletTransactions", walletController.getWalletTransactions);

// router.post("/getWalletBalance", walletController.getWalletBalance);

// router.post("/getWalletBalanceHistory", walletController.getWalletBalanceHistory);

// router.post("/getWalletBalanceTransactions", walletController.getWalletBalanceTransactions);

module.exports = router;
