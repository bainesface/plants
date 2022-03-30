exports.formatVeg = (veg) => {
	return veg.map((vege) => {
		const veg = {
			plant_name: vege.name,
			img_url: vege.imgUrl,
			description: vege.desc,
			type: "veg",
			// sow: formatJobs(vege.monthlyJob, "Sow"),
			// plant: formatJobs(vege.monthlyJob, "Plant"),
			// harvest: formatJobs(vege.monthlyJob, "Harvest"),
		};
		return veg;
	});
};

const formatJobs = (jobs, type) => {
	const months = {
		0: "jan",
		1: "feb",
		2: "mar",
		3: "apr",
		4: "may",
		5: "jun",
		6: "jul",
		7: "aug",
		8: "sep",
		9: "oct",
		10: "nov",
		11: "dec",
	};

	return jobs
		.map((job, index) => {
			if (job === type) {
				return months[index];
			}
		})
		.filter((month) => month !== undefined);
};
