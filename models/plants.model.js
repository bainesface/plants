const db = require("../db/connection");
const { validateSortBy, validateOrder } = require("../db/utils/validate");

exports.fetchPlants = async (sortBy = "plant_name", order = "asc") => {
	const validSortBy = await validateSortBy(sortBy);
	const validOrder = await validateOrder(order);

	let qryStr = `SELECT plants.*, 
    COUNT(comment_id)::INT AS comment_count 
    FROM plants 
    LEFT JOIN comments 
    ON comments.plant_id = plants.plant_id 
    GROUP BY plants.plant_id 
    ORDER BY ${validSortBy} ${validOrder};`;

	const { rows } = await db.query(qryStr);
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
	return rows[0];
};
