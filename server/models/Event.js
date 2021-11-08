const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema({
	eventTitle: {
		type: String,
		required: "You need to have a title!",
		minlength: 1,
		maxlength: 120,
		trim: true,
	},
	eventDescription: {
		type: String,
		required: "You need to have a description!",
		trim: true,
	},
	eventImg: {
		type: String,
		default: "../../assets/img/events/default.png",
	},
	eventLink: {
		type: String,
	},
	isPremiumContent: {
		type: Boolean,
		default: false,
	},
	eventDate: {
		// type: Date,
		// default: Date.now,
		// get: (timestamp) => dateFormat(timestamp),
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	category: {
		type: String,
		// default: "Uncategorized",
	},
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	comments: [
		{
			commentText: {
				type: String,
				required: true,
				minlength: 1,
				maxlength: 280,
			},
			commentAuthor: {
				type: String,
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now,
				get: (timestamp) => dateFormat(timestamp),
			},
		},
	],
});

const Event = model("Event", eventSchema);

module.exports = Event;
