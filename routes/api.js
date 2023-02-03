const express = require("express");
const authRouter = require("./auth");
const gameRouter = require("./game");
const walletRouter = require("./wallet");

const app = express();

// Auth Routes
app.use("/auth/", authRouter);

// Game Routes
app.use("/game/", gameRouter);

app.use("/wallet/", walletRouter);
module.exports = app;
