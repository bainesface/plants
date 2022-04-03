const { fetchPlants, fetchPlantById } = require("../models/plants.model");

exports.getPlants = async (req, res, next) => {
	const { sort_by, order } = req.query;
	const plants = await fetchPlants(sort_by, order);
	res.status(200).send({ plants });
};

exports.getPlantById = async (req, res, next) => {
	const { plant_id } = req.params;

	const plant = await fetchPlantById(plant_id);
	res.status(200).send({ plant });
};
