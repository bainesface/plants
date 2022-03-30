const db = require("./connection");
const { seed } = require("./seed");
const devData = require("./data/index");

seed(devData).then(() => {
	db.end();
});
