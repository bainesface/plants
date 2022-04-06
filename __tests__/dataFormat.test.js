const { expect } = require("@jest/globals");
const { veg } = require("../db/data/index");
const { formatVeg } = require("../db/utils/dataFormat");

describe("formatVeg", () => {
	test("returns a veg object in the right format", () => {
		const formattedVeg = formatVeg(veg.slice(0, 10));
		expect(formattedVeg.length).toBeGreaterThan(0);
		formattedVeg.forEach((veg) => {
			expect(veg).toEqual(
				expect.objectContaining({
					plant_name: expect.any(String),
					img_url: expect.any(String),
					description: expect.any(String),
					type: "veg",
				})
			);
		});
	});
	test("returns a new array", () => {
		const veggies = veg.slice(0, 10);
		const formattedVeg = formatVeg(veggies);
		expect(formattedVeg).not.toBe(veggies);
	});
	test("doesn't mutate original array", () => {
		const veggies = [
			{
				"name": "Asparagus",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Asparagus is easy to grow.  ",
			},
			{
				"name": "Aubergines",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Aubergines are becoming increasingly popular.",
			},
			{
				"name": "Beetroot",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Beetroot are easy to grow.",
			},
		];
		formatVeg(veggies);
		expect(veggies).toEqual([
			{
				"name": "Asparagus",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Asparagus is easy to grow.  ",
			},
			{
				"name": "Aubergines",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Aubergines are becoming increasingly popular.",
			},
			{
				"name": "Beetroot",
				"imgUrl": "https://www.rhs.org.uk",
				"monthlyJob": [],
				"desc": "Beetroot are easy to grow.",
			},
		]);
	});
});
