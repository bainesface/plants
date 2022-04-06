exports.PSQLErrorHandler = (err, req, res, next) => {
	if ((err.code = 42703)) {
		res.status(400).send({ msg: "Invalid sort by" });
	}
};
