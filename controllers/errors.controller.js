exports.handlePSQLError = (err, req, res, next) => {
	const errs = { "22P02": { status: 400, msg: "Invalid id" } };
	if (err.code) {
		const { status, msg } = errs[err.code];
		res.status(status).send({ msg });
	} else next(err);
};

exports.handleCustomError = (err, req, res, next) => {
	const { status, msg } = err;
	res.status(status).send({ msg });
};
