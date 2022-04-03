const { fetchTypes } = require("../models/types.model");

exports.getTypes = async (req, res, next) => {
	const types = await fetchTypes();
	res.status(200).send({ types });
};
