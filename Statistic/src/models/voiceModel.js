const mongoose = require("mongoose");
const VoiceSchema = mongoose.Schema({
	userID: {
		type: String,
		required: true,
	},
	guildID: {
		type: String,
		required: true,
	},
	messages: {
		type: Number,
		required: true,
		default: 0,
	},
	voice: {
		type: Number,
		required: true,
		default: 0,
	},
	streaming: {
		type: Number,
		required: true,
		default: 0,
	},
});
module.exports = mongoose.model("VoiceSchema", VoiceSchema);
