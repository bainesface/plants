const express = require("express");
const {
	handlePSQLError,
	handleCustomError,
} = require("./controllers/errors.controller");
const app = express();
const apiRouter = require("./routers/api.router");

app.use("/api", apiRouter);
app.use(handlePSQLError);
app.use(handleCustomError);

module.exports = app;
