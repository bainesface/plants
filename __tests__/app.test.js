const db = require("../db/connection");
const { seed } = require("../db/seed");
const devData = require("../db/data/index");
const app = require("../app");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => seed(devData));
afterAll(() => db.end());

describe("/api", () => {
	describe("/types", () => {
		test("GET: Returns 200 and array of types", async () => {
			const {
				body: { types },
			} = await request(app).get("/api/types").expect(200);
			expect(types.length).toBe(3);
			types.forEach((type) => {
				expect(type).toEqual(
					expect.objectContaining({
						type: expect.any(String),
						description: expect.any(String),
					})
				);
			});
		});
	});
	describe("/users", () => {
		test("GET: Returns 200 and array of users", async () => {
			const {
				body: { users },
			} = await request(app).get("/api/users").expect(200);
			expect(users.length).toBe(3);
			users.forEach((type) => {
				expect(type).toEqual(
					expect.objectContaining({
						username: expect.any(String),
					})
				);
			});
		});
	});
	describe("/plants", () => {
		test("GET: Returns 200 and array of plants", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants").expect(200);
			expect(plants.length).toBe(45);
			plants.forEach((type) => {
				expect(type).toEqual(
					expect.objectContaining({
						plant_id: expect.any(Number),
						plant_name: expect.any(String),
						img_url: expect.any(String),
						description: expect.any(String),
						type: expect.any(String),
						votes: expect.any(Number),
						comment_count: expect.any(Number),
					})
				);
			});
		});
		test("GET: Plants are sorted alphabetically and in ascending order by default", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants").expect(200);
			expect(plants).toBeSortedBy("plant_name");
		});
		test("GET: Plants can be sorted by comment count", async () => {
			const {
				body: { plants },
			} = await request(app)
				.get("/api/plants?sort_by=comment_count")
				.expect(200);
			expect(plants).toBeSortedBy("comment_count");
		});
		test("GET: Plants can be sorted by votes", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?sort_by=votes").expect(200);
			expect(plants).toBeSortedBy("votes");
		});
		test("GET: Plants can be ordered descendingly", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?order=desc").expect(200);
			expect(plants).toBeSortedBy("plant_name", { descending: true });
		});
	});
	describe("/plants/:plant_id", () => {
		test("GET: Returns 200 and the correct plant", async () => {
			const {
				body: { plant },
			} = await request(app).get("/api/plants/1").expect(200);
			expect(plant).toEqual({
				plant_id: 1,
				plant_name: "Asparagus",
				img_url: expect.any(String),
				description: expect.any(String),
				type: "veg",
				votes: 0,
				comment_count: 0,
			});
		});
	});
});
