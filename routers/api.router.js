const apiRouter = require("express").Router();
const typesRouter = require("./types.router");
const usersRouter = require("./users.router");
const plantsRouter = require("./plants.router");

apiRouter.use("/types", typesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/plants", plantsRouter);

module.exports = apiRouter;
