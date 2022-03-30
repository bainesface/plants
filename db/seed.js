const { dropTables, createTables } = require("./createTables");
const db = require("./connection");
const format = require("pg-format");
const { formatVeg } = require("./utils/dataFormat");

exports.seed = async ({ types, veg, users }) => {
	await dropTables();
	await createTables();

	const insertUsersStr = format(
		`INSERT INTO users (username) VALUES %L RETURNING *;`,
		users.map(({ username }) => [username])
	);
	const insertTypesStr = format(
		`INSERT INTO types (type, description) VALUES %L RETURNING *;`,
		types.map(({ type, description }) => [type, description])
	);

	const formattedVeg = formatVeg(veg);
	const insertVegStr = format(
		`INSERT INTO plants (plant_name, img_url, description, type) VALUES %L RETURNING *;`,
		formattedVeg.map(({ plant_name, img_url, description, type }) => [
			plant_name,
			img_url,
			description,
			type,
		])
	);

	await db.query(insertUsersStr);
	await db.query(insertTypesStr);
	await db.query(insertVegStr);
};
