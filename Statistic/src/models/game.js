const mongoose = require("mongoose");
const Oyun = mongoose.Schema({
	userID: String,
	para: { type: Number, default: 0 },
	coinTime: { type: Number, default: 0 },
	cookie: { type: Number, default: 0 },
	cookieTime: { type: Number, default: 0 },
});
module.exports = mongoose.model("Oyun", Oyun);
