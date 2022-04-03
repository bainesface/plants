const plantsRouter = require("express").Router();
const { getPlants, getPlantById } = require("../controllers/plants.controller");

plantsRouter.get("/", getPlants);

plantsRouter.get("/:plant_id", getPlantById);

module.exports = plantsRouter;
