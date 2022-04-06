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
		test("GET: 200 returns array of plants", async () => {
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
		test("GET: 200 Plants are sorted alphabetically and in ascending order by default", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants").expect(200);
			expect(plants).toBeSortedBy("plant_name");
		});
		test("GET: 200 Plants can be sorted by comment count", async () => {
			const {
				body: { plants },
			} = await request(app)
				.get("/api/plants?sort_by=comment_count")
				.expect(200);
			expect(plants).toBeSortedBy("comment_count");
		});
		test("GET: 200 Plants can be sorted by votes", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?sort_by=votes").expect(200);
			expect(plants).toBeSortedBy("votes");
		});
		test("GET: 200 Plants can be ordered descendingly", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?order=desc").expect(200);
			expect(plants).toBeSortedBy("plant_name", { descending: true });
		});
		test("GET: 200 Plants can be filtered by type", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?type=veg").expect(200);
			expect(plants.length).toBe(45);
			plants.forEach((plant) => {
				expect(plant.type).toBe("veg");
			});
		});
		test("GET: 200 Plants can be filtered by type", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?type=mushroom").expect(200);
			expect(plants.length).toBe(0);
		});
		test("GET: 400 Plants can only be sorted by a vaild sort by query", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?sort_by=bananas").expect(400);
			expect(msg).toBe("Invalid sort by");
		});
		test("GET: 400 Plants can only be sorted by a vaild order query", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?order=bananas").expect(400);
			expect(msg).toBe("Invalid order");
		});
		test("GET: 404 Plants can only be filtered by an existing type", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?type=bananas").expect(404);
			expect(msg).toBe("Type not found");
		});
	});
	describe("/plants/:plant_id", () => {
		test("GET: 200 returns the correct plant", async () => {
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
		test("GET: 404 returns not found when passed a non existing plant id", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants/999").expect(404);
			expect(msg).toBe("Plant not found");
		});
		test("GET: 400 returns invalid id when passed invalid type", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants/bananas").expect(400);
			expect(msg).toBe("Invalid id");
		});
	});
});
