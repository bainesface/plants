const db = require("../db/connection");
const { validateSortBy, validateOrder } = require("../db/utils/validate");

exports.fetchPlants = async (sortBy = "plant_name", order = "asc", type) => {
	const validSortBy = await validateSortBy(sortBy);
	const validOrder = await validateOrder(order);

	const qryParams = [];

	let qryStr = `SELECT plants.*, 
    COUNT(comment_id)::INT AS comment_count 
    FROM plants 
    LEFT JOIN comments 
    ON comments.plant_id = plants.plant_id `;

	if (type) {
		qryStr += `WHERE plants.type ILIKE $1`;
		qryParams.push(type);
	}

	qryStr += `GROUP BY plants.plant_id
    ORDER BY ${validSortBy} ${validOrder};`;

	const { rows } = await db.query(qryStr, qryParams);

	return rows;
};

exports.fetchPlantById = async (id) => {
	const { rows } = await db.query(
		`SELECT plants.*, 
        COUNT(comment_id)::INT AS comment_count 
        FROM plants 
        LEFT JOIN comments 
        ON comments.plant_id = plants.plant_id 
        WHERE plants.plant_id = $1 
        GROUP BY plants.plant_id;`,
		[id]
	);
	if (!rows.length) {
		return Promise.reject({ status: 404, msg: "Plant not found" });
	}
	return rows[0];
};
