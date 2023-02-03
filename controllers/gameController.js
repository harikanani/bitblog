const GameModel = require("../models/GameModel");
const apiResponse = require("../helpers/apiResponse");
const { generateRandomId, getUserBalance } = require("../helpers/index");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

moment.tz.setDefault("Asia/Kolkata");

module.exports = {
	// newGame
	newGame: async (req, res) => {
		try {
			// check if game already exists then don't create new game
			const game = await GameModel.findOne({
				gameStatus: "active",
				gameEndTime: { $gt: moment() },
			});

			if (game) {
				return apiResponse.validationError(
					res,
					"Game already exists, can't create new game.",
				);
			}

			// Generate new Game ID
			const gameId = generateRandomId(12);

			// Set Game Duration to 3 minute and pore time to 30 last seconds and result time to last 10 seconds with current date time
			const gameStartTime = moment();

			// 3 minute ahead of game time
			const gameEndTime = gameStartTime.add(3, "minutes");
			// const gameEndTime = new Date(gameStartTime.getTime() + 3 * 60000);

			// 30 seconds before game end time
			const gamePoreTime = gameEndTime.subtract(30, "seconds");
			// const gamePoreTime = new Date(gameEndTime.getTime() - 30 * 1000);

			// 10 seconds before game end time
			const gameResultTime = gameEndTime.subtract(10, "seconds");
			// const gameResultTime = new Date(gameEndTime.getTime() - 10 * 1000);

			try {
				// Set Game Data
				const gameData = {
					gameId: gameId,
					gameStartTime: gameStartTime,
					gameEndTime: gameEndTime,
					gamePoreTime: gamePoreTime,
					gameResultTime: gameResultTime,
					gameStatus: "active",
					gameResult: "pending",
					gameWinner: "pending",
					gamePlayers: [],
					gamePlayersCount: 0,
				};

				// Save Game Data to DB
				const newGame = await new GameModel(gameData).save();

				if (newGame) {
					return apiResponse.successResponseWithData(
						res,
						"Game created successfully",
						gameData,
					);
				}

				return apiResponse.ErrorResponse(
					res,
					"Error in creating game, please try again later.",
				);
			} catch (error) {
				return apiResponse.ErrorResponse(
					res,
					"Something went wrong, please try again later.",
				);
			}
		} catch (error) {
			return apiResponse.ErrorResponse(res, "Inernal Server Error.");
		}
	},

	// bet
	bet: async (req, res) => {
		try {
			let { userId, gameId, amount, betNumber, betColour } = req.body;

			if (!gameId || !amount || !userId) {
				return apiResponse.validationError(
					res,
					"Please provide all required fields.",
				);
			}

			let marginPercent = process.env.MARGIN_PERCENTAGE || 0.02;
			let marginAmount = amount * marginPercent;
			let betAmount = amount - marginAmount;

			// check if game exists
			const game = await GameModel.findOne({
				gameStatus: "active",
				gameId: mongoose.Types.ObjectId(gameId),
			});

			if (!game) {
				return apiResponse.validationError(
					res,
					"Game doesn't exists, please try again later.",
				);
			}

			// check if game is in bet time
			if (game.gamePoreTime < moment()) {
				return apiResponse.validationError(
					res,
					"Game is not in bet time, please try again later.",
				);
			}

			// check if game is in result time
			if (game.gameResultTime < moment()) {
				return apiResponse.validationError(
					res,
					"Game is not in result time, please try again later.",
				);
			}

			// check if user has sufficient balance to bet
			let userBalance = await getUserBalance(req.body.userId);

			if (userBalance < amount) {
				return apiResponse.validationError(
					res,
					"Insufficient balance, please add funds to bet.",
				);
			}

			// check if betNumber or betColour is provided
			if (!betNumber && !betColour) {
				return apiResponse.validationError(
					res,
					"Please provide bet number or bet colour.",
				);
			}

			// check if betNumber is provided
			if (betNumber) {
				// check if betNumber is valid
				if (betNumber < 0 || betNumber > 9) {
					return apiResponse.validationError(
						res,
						"Please provide valid bet number.",
					);
				}

				// create bet data
				let betData = {
					user_id: mongoose.Types.ObjectId(userId),
					game_id: mongoose.Types.ObjectId(gameId),
					bet_amount: betAmount,
					bet_number: betNumber,
					bet_type: "number",
				};

				// make bet entry in bet table
				const newBet = await new BetModel(betData).save();

				if (!newBet) {
					return apiResponse.ErrorResponse(
						res,
						"Error in making bet, please try again later.",
					);
				}

				// find transactionTypeID for bet

				// create transaction data
				let betTransactionData = {
					user_id: mongoose.Types.ObjectId(userId),
					game_id: mongoose.Types.ObjectId(gameId),
					bet_id: mongoose.Types.ObjectId(newBet._id),
					tx_type_id:
				}
			}

			// make bet entry in game
		} catch (error) {
			return apiResponse.ErrorResponse(res, "Inernal Server Error.");
		}
	},
};
