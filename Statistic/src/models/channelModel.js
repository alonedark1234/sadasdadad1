const mongoose = require("mongoose");
const ChannelSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	guildID: {
		type: String,
		required: true,
	},
	channelID: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	data: {
		type: Number,
		required: true,
		default: 0,
	},
});
module.exports = mongoose.model("ChannelSchema", ChannelSchema);
