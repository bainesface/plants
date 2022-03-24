const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
const fs = require("fs/promises");

const makeVegObject = async (vegetable) => {
	try {
		const baseUrl = "https://www.rhs.org.uk";
		const { data } = await axios.get(
			`${baseUrl}/vegetables/${vegetable}/grow-your-own`
		);

		const dom = htmlparser2.parseDocument(data);
		const $ = cheerio.load(dom);

		const name = $("h1[class=h1--alt]").html();

		const p = $("p").text();
		const desc = p.slice(546).split(".").slice(0, -4).join(". ");

		const img = $("img");
		const imgUrl = `${baseUrl}${img[12].attribs.src}`;

		const tables = $("table");
		const table = tables[0].children[0].children;
		const monthlyJob = [];
		table.forEach((row, rowIndex) => {
			row.children.forEach((child, index) => {
				child.children.forEach((element) => {
					if (element && element.data) {
						if (rowIndex === 1) {
							monthlyJob[index] = element.data;
						} else if (rowIndex === 3) {
							monthlyJob[index + 3] = element.data;
						} else if (rowIndex === 5) {
							monthlyJob[index + 5] = element.data;
						}
					}
				});
			});
		});

		const veg = { name, imgUrl, monthlyJob, desc };

		return veg;
	} catch (err) {
		console.log(err);
	}
};

const veg = [
	"asparagus",
	"aubergines",
	"beetroot",
	"broad-beans",
	"broccoli",
	"brussels-sprouts",
	"cabbages",
	"calabrese",
	"carrots",
	"cauliflower",
	"celeriac",
	"celery",
	"chard",
	"chicory",
	"chilli-pepper",
	"courgettes",
	"cucumbers",
	"florence-fennel",
	"french-beans",
	"garlic",
	"globe-artichokes",
	"kale",
	"kohl-rabi",
	"leeks",
	"lettuce",
	"onions",
	"pak-choi",
	"parsnips",
	"peas",
	"peppers",
	"potatoes",
	"pumpkins",
	"radishes",
	"rhubarb",
	"rocket",
	"runner-beans",
	"salad-leaves",
	"salad-onions",
	"spinach",
	"squash",
	"swede",
	"sweet-potatoes",
	"sweetcorn",
	"tomatoes",
	"turnips",
];

const getVegData = async () => {
	const vegPromises = veg.map((vegetable) => makeVegObject(vegetable));
	try {
		const vegData = await Promise.all(vegPromises);
		fs.writeFile("./veg.json", JSON.stringify(vegData));
	} catch (err) {
		console.log(err);
	}
};

getVegData();
