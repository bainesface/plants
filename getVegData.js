const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
const fs = require("fs/promises");

const makeVegObject = async (vegetable) => {
	try {
		const { data } = await axios.get(
			`https://www.rhs.org.uk/vegetables/${vegetable}/grow-your-own`
		);
		const dom = htmlparser2.parseDocument(data);
		const $ = cheerio.load(dom);
		const name = $("h1[class=h1--alt]").html();
		const p = $("p").text();
		let desc = p.slice(546);
		desc = desc.split(".");
		desc.pop();
		desc.pop();
		desc.pop();
		desc.pop();
		desc = desc.join(". ");

		const img = $("img");
		const imgUrl = `https://www.rhs.org.uk${img["12"].attribs.src}`;
		const tables = $("table");
		const table = tables["0"].children["0"].children;
		const monthlyJob = [];
		table.forEach((row, rowIndex) => {
			row.children.forEach((child, index) => {
				child.children.forEach((kid) => {
					if (kid && kid.data) {
						if (rowIndex === 1) {
							monthlyJob[index] = kid.data;
						} else if (rowIndex === 3) {
							monthlyJob[index + 3] = kid.data;
						} else if (rowIndex === 5) {
							monthlyJob[index + 5] = kid.data;
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
	const vegData = await Promise.all(vegPromises);
	try {
		await fs.writeFile("./data/veg.json", JSON.stringify(vegData));
	} catch (err) {
		console.log(err);
	}
};

getVegData();
