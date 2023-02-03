const express = require("express");
const GameController = require("../controllers/gameController");

const router = express.Router();

router.post("/newGame", GameController.newGame);

router.post("/bet", GameController.bet);

module.exports = router;
