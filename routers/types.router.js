const typesRouter = require("express").Router();

typesRouter.get("/", () => {
	console.log("helloooooo");
});

module.exports = typesRouter;
