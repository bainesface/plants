const db = require("../db/connection");
const { seed } = require("../db/seed");
const devData = require("../db/data/index");
const app = require("../app");
const request = require("supertest");
require("jest-sorted");

beforeEach(() => seed(devData));
afterAll(() => db.end());

describe("/api", () => {
	describe("GET /types", () => {
		test("200 returns array of types", async () => {
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
	describe("GET /users", () => {
		test("200 returns array of users", async () => {
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
	describe("GET /plants", () => {
		test("200 returns array of plants", async () => {
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
		test("200 Plants are sorted alphabetically and in ascending order by default", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants").expect(200);
			expect(plants).toBeSortedBy("plant_name");
		});
		test("200 Plants can be sorted by comment count", async () => {
			const {
				body: { plants },
			} = await request(app)
				.get("/api/plants?sort_by=comment_count")
				.expect(200);
			expect(plants).toBeSortedBy("comment_count");
		});
		test("200 Plants can be sorted by votes", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?sort_by=votes").expect(200);
			expect(plants).toBeSortedBy("votes");
		});
		test("200 Plants can be ordered descendingly", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?order=desc").expect(200);
			expect(plants).toBeSortedBy("plant_name", { descending: true });
		});
		test("200 Plants can be filtered by type", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?type=veg").expect(200);
			expect(plants.length).toBe(45);
			plants.forEach((plant) => {
				expect(plant.type).toBe("veg");
			});
		});
		test("200 Plants can be filtered by type", async () => {
			const {
				body: { plants },
			} = await request(app).get("/api/plants?type=mushroom").expect(200);
			expect(plants.length).toBe(0);
		});
		test("400 Plants can only be sorted by a vaild sort by query", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?sort_by=bananas").expect(400);
			expect(msg).toBe("Invalid sort by");
		});
		test("400 Plants can only be sorted by a vaild order query", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?order=bananas").expect(400);
			expect(msg).toBe("Invalid order");
		});
		test("404 Plants can only be filtered by an existing type", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants?type=bananas").expect(404);
			expect(msg).toBe("Type not found");
		});
	});
	describe("POST /plants", () => {
		test("201 Returns a newly added plant", async () => {
			const newPlant = {
				plant_name: "Thyme",
				type: "herb",
				description: "Used globally in cooking and very delicious",
				img_url:
					"https://ahealthylifeforme.com/wp-content/uploads/2012/05/img_8511.jpg",
			};
			const {
				body: { plant },
			} = await request(app).post("/api/plants").send(newPlant).expect(201);
			expect(plant).toEqual({ ...newPlant, plant_id: 46, votes: 0 });
		});
	});
	describe("GET /plants/:plant_id", () => {
		test("200 returns the correct plant", async () => {
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
		test("404 returns not found when passed a non existing plant id", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants/999").expect(404);
			expect(msg).toBe("Plant not found");
		});
		test("400 returns invalid id when passed invalid type", async () => {
			const {
				body: { msg },
			} = await request(app).get("/api/plants/bananas").expect(400);
			expect(msg).toBe("Invalid id");
		});
	});
});
