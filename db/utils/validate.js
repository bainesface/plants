exports.validateSortBy = (value) => {
	const validSortValues = ["plant_name", "comment_count", "votes"];

	if (validSortValues.includes(value)) return value;

	return Promise.reject({ status: 400, msg: "Invalid sort by" });
};

exports.validateOrder = (value) => {
	const validOrderValues = [
		"asc",
		"desc",
		"ASC",
		"DESC",
		"ascending",
		"descending",
		"ASCENDING",
		"DESCENDING",
	];

	if (validOrderValues.includes(value)) return value;

	return Promise.reject({ status: 400, msg: "Invalid order" });
};
