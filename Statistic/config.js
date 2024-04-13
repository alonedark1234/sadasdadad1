const CONFIG = {
	BOT_TOKEN:
		"MTExMTc3MDU3NzQxMDIwNzg1NQ.G1knk8.SJOFHEDnBngBckSCwnQ93yMqaK4q-dHp5oVJVk",
	MONGO_URL:
		"mongodb+srv://can:Can_Galatasaray_1905@cluster0.b8iccgb.mongodb.net/1783stat1?retryWrites=true&w=majority",
	PREFIX: ["!", "."],
	BOT_VOICE_CHANNEL: "1109890413290082415",
	BOT_STATUS: ["canzade ❤️ 1783", "Stêrn ❤️ canzade"],
	TAG: "ග",
	BOT_OWNERS: ["331846231514939392"],
	GUILD_OWNERS: ["331846231514939392"],
	GUILD_ID: "1089914567594881060",
	LEADERBOARDS_CHANNEL: "1112051766150840340",
	LEADERBOARDS_MESSAGE_TEXT: "1112061598593466509",
	LEADERBOARDS_MESSAGE_VOICE: "1112061595242221708",
	REWARD_CHANNEL: "1013200755727007851",
	STREAMER_ROLE: "1109890291315507231",
	STAFF_ROLE: ["1109890277700816978"],

	PARENTS: [
		{
			name: "Public",
			id: "1109890395934040114",
		},
		{
			name: "Kayıt",
			id: "1109890389420294294",
		},
		/*	{
			name: "Sorun Çözme",
			id: "1013200757245345818",
		},
		{
			name: "Stream",
			id: "1013200757463462003",
		},*/
		{
			name: "Toplantı",
			id: "1109890418264514661",
		},
		{
			name: "VK -DC",
			id: "1109890399734083694",
		},
		/*{
			name: "Etkinlik",
			id: "1013200754770706456",
		},
		{
			name: "Konser",
			id: "1013200754770706456",
		},*/
		{
			name: "Secret",
			id: "1109890397381083158",
		},
	],

	CHANNELSTAT: [
		{
			name: "Sleep Room",
			id: "1109890434379038810",
		},
	],

	VOICE_REWARDS: [
		{
			rank: 1000 * 60 * 60 * 24 * 4,
			role: "1013200754657472546",
		},
		{
			rank: 1000 * 60 * 60 * 24 * 12,
			role: "1013200754657472547",
		},
		{
			rank: 1000 * 60 * 60 * 24 * 33,
			role: "1013200754657472548",
		},
		{
			rank: 1000 * 60 * 60 * 24 * 83,
			role: "1013200754657472549",
		},
	],
	TEXT_REWARDS: [
		{
			rank: 1000,
			role: "1013200754640687204",
		},

		{
			rank: 5000,
			role: "1013200754657472542",
		},
		{
			rank: 50000,
			role: "1013200754657472543",
		},
		{
			rank: 100000,
			role: "1013200754657472544",
		},
	],

	emojis: {
		yes_name: "yes_zade",
		no_name: "no_zade",
		fillStart: "<:ilkdolu:1054126888685142076>",
		fill: "<:ortadolu:1054126899674226749>",
		fillEnd: "<:sondolu:1054127437203648633>",
		emptyStart: "<:ilkbos:1054126886860628099>",
		empty: "<:ortabos:1054126897795190935>",
		emptyEnd: "<:sonbos:1054126901364527175>",
	},
};

module.exports = CONFIG;
