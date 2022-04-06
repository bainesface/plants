exports.handlePSQLError = (err, req, res, next) => {
	if (err.code) console.log(err);
	else next(err);
};

exports.handleCustomError = (err, req, res, next) => {
	const { status, msg } = err;
	res.status(status).send({ msg });
};
