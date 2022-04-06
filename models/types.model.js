const db = require("../db/connection");

exports.fetchTypes = async () => {
	const { rows } = await db.query("SELECT * FROM types;");
	return rows;
};

exports.checkTypeExists = async (type) => {
	const { rows } = await db.query(
		`SELECT * FROM types
		WHERE types.type ILIKE $1;`,
		[type]
	);
	if (!rows.length) {
		return Promise.reject({ status: 404, msg: "Type not found" });
	}
};
