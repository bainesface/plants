exports.formatVeg = (veg) => {
	return veg.map((vege) => {
		const veg = {
			veg_name: vege.name,
			img_url: vege.imgUrl,
			description: vege.desc,
		};
		return veg;
	});
};
