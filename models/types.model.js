const db = require("../db/connection");

exports.fetchTypes = async () => {
	const { rows } = await db.query("SELECT * FROM types;");
	return rows;
};
