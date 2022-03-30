const apiRouter = require("express").Router();
const typesRouter = require("./types.router.js");

apiRouter.use("/types", typesRouter);

module.exports = apiRouter;
