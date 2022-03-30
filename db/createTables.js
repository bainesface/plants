const db = require("./connection");

exports.dropTables = async () => {
	await db.query(`DROP TABLE IF EXISTS comments;`);
	await db.query(`DROP TABLE IF EXISTS plants;`);
	await db.query(`DROP TABLE IF EXISTS users;`);
	await db.query(`DROP TABLE IF EXISTS types;`);
};

exports.createTables = async () => {
	await db.query(`CREATE TABLE types (
        type VARCHAR PRIMARY KEY,
        description VARCHAR
    );`);
	await db.query(`CREATE TABLE users (
        username VARCHAR PRIMARY KEY
    );`);
	await db.query(`CREATE TABLE plants (
        plant_id SERIAL PRIMARY KEY,
        plant_name VARCHAR NOT NULL,
        img_url VARCHAR,
        description VARCHAR NOT NULL,
        type VARCHAR NOT NULL REFERENCES types(type),
        votes INT NOT NULL DEFAULT 0
    );`);
	await db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        plant_id INT NOT NULL REFERENCES plants(plant_id),
        body VARCHAR NOT NULL,
        author VARCHAR NOT NULL REFERENCES users(username),
        created_at TIMESTAMP DEFAULT NOW(),
        votes INT NOT NULL DEFAULT 0
    );`);
};
