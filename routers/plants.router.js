const plantsRouter = require("express").Router();
const {
	getPlants,
	getPlantById,
	postPlant,
} = require("../controllers/plants.controller");

plantsRouter.route("/").get(getPlants).post(postPlant);

plantsRouter.get("/:plant_id", getPlantById);

module.exports = plantsRouter;
