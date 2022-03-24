const db = require("./connection");

const seed = async () => {
	await db.query(`DROP TABLE IF EXISTS veg;`);
	await db.query(`DROP TABLE IF EXISTS jobs;`);
	await db.query(`CREATE TABLE veg (
        veg_id SERIAL PRIMARY KEY,
        veg_name VARCHAR NOT NULL,
        img_url VARCHAR,
        description VARCHAR NOT NULL
    );`);
	await db.query(`CREATE TABLE jobs (
        job_name VARCHAR PRIMARY KEY,
        month VARCHAR NOT NULL,
        veg_id INT NOT NULL references veg(veg_id)
    );`);
};

seed().then(() => {
	db.end();
});
