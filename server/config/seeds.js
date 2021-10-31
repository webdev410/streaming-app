const db = require("./connection");
const { Product, Category } = require("../models");

db.once("open", async () => {
	await Category.deleteMany();

	const categories = await Category.insertMany([
		{ name: "Uncategorized" },
		{ name: "Tutorials" },
		{ name: "Concerts" },
		{ name: "Gaming" },
		{ name: "Exercise" },
	]);

	console.log("categories seeded");

	await Product.deleteMany();

	const products = await Product.insertMany([
		{
			name: "Become Premium Member",
			description:
				"Become a premium member of T.E.A.M. Stream for a set price.",
			image: "online-streaming.png",
			category: categories[0]._id,
			price: 5.99,
			quantity: 1,
		},
	]);

	console.log("products seeded");

	process.exit();
});
