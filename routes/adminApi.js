const express = require("express");
const adminFinanceRouter = require("./admin/finance");

const app = express();

// Finance Routes
app.use("/finance", adminFinanceRouter);

module.exports = app;
