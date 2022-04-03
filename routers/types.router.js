const typesRouter = require("express").Router();
const { getTypes } = require("../controllers/types.controller");

typesRouter.get("/", getTypes);

module.exports = typesRouter;
