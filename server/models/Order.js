const mongoose = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const { Schema } = mongoose;

const orderSchema = new Schema({
	purchaseDate: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	products: [
		{
			type: Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
