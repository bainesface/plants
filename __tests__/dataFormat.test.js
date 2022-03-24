const { veg } = require("../db/data/index");

console.log(veg);
describe("formatVeg", () => {
	test("returns a veg object in the right format", () => {
		expect(formatVeg(veg.slice(0, 10))).toEqual(
			expect.objectContaining({
				veg_name: expect.any(String),
				img_url: expect.any(String),
				description: expect.any(String),
			})
		);
	});
});
