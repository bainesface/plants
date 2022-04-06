const express = require("express");
const { PSQLErrorHandler } = require("./controllers/errors.controller");
const app = express();
const apiRouter = require("./routers/api.router");

app.use("/api", apiRouter);
app.use(PSQLErrorHandler);

module.exports = app;
