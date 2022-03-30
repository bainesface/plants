const db = require("../db/connection");
const { seed } = require("../db/seed");
const devData = require("../db/data/index");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(devData));
afterAll(() => db.end());

describe("/api/types", () => {
	test("GET: Returns 200 and array of types", async () => {
		const { data: types } = await request(app).get("/api/types").expect(200);
		expect(types.length).toBe(3);
	});
});
