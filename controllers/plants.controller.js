const { fetchPlants, fetchPlantById } = require("../models/plants.model");
const { checkTypeExists } = require("../models/types.model");

exports.getPlants = async (req, res, next) => {
	const { sort_by, order, type } = req.query;
	try {
		if (type) await checkTypeExists(type);
		const plants = await fetchPlants(sort_by, order, type);
		res.status(200).send({ plants });
	} catch (err) {
		next(err);
	}
};

exports.getPlantById = async (req, res, next) => {
	const { plant_id } = req.params;

	const plant = await fetchPlantById(plant_id);
	res.status(200).send({ plant });
};
