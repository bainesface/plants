const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
const fs = require("fs/promises");

const makeMushroomObject = async (mushroom) => {
	const baseUrl = "https://www.wildfooduk.com/mushroom-guide";

	const { data } = axios.get(`${baseUrl}`);
	const dom = htmlparser2.parseDocument(data);
	const $ = cheerio.load(dom);

	console.log($);
};

makeMushroomObject("medusa");
