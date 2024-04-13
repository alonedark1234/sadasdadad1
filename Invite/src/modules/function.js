const mongoose = require("mongoose");
const Discord = require("discord.js");
const can = require("pretty-ms");
const ms = require("ms");

module.exports = async (client) => {
	client.findOrCreateUser = async ({ id: userID }, isLean) => {
		return new Promise(async (resolve) => {
			if (client.databaseCache.users.get(userID)) {
				resolve(
					isLean
						? client.databaseCache.users.get(userID).toJSON()
						: client.databaseCache.users.get(userID),
				);
			} else {
				let userData = isLean
					? await client.usersData.findOne({ id: userID }).lean()
					: await client.usersData.findOne({ id: userID });
				if (userData) {
					resolve(userData);
				} else {
					userData = new client.usersData({ id: userID });
					await userData.save();
					resolve(isLean ? userData.toJSON() : userData);
				}
				client.databaseCache.users.set(userID, userData);
			}
		});
	};

	client.yuzde = (partialValue, totalValue) => {
		return (100 * partialValue) / totalValue;
	};

	client.kaldır = (arr, value) => {
		var i = 0;
		while (i < arr.length) {
			if (arr[i] === value) {
				arr.splice(i, 1);
			} else {
				++i;
			}
		}
		return arr;
	};

	client.send = (mesaj, msg, kanal) => {
		if (!mesaj || typeof mesaj !== "string") return;
		const embd = new Discord.EmbedBuilder()
			.setAuthor({
				name: msg.tag,
				iconURL: msg.displayAvatarURL({ dynamic: true }),
			})
			.setColor("Aqua")
			.setDescription(mesaj);
		kanal
			.send({ embeds: [embd] })
			.then((msg) => {
				{
					setTimeout(() => {
						msg.delete();
					}, 15000);
				}
			})
			.catch();
	};

	client.turkishDate = (date) => {
		if (!date || typeof date !== "number") return;
		let convert = can(date, { verbose: true })
			.replace("minutes", "dakika")
			.replace("minute", "dakika")
			.replace("hours", "saat")
			.replace("hour", "saat")
			.replace("seconds", "saniye")
			.replace("second", "saniye")
			.replace("days", "gün")
			.replace("day", "gün")
			.replace("years", "yıl")
			.replace("year", "yıl");
		return convert;
	};

	client.findOrCreateUser = ({ id: userID }, isLean) => {
		return new Promise(async (resolve) => {
			if (client.databaseCache.users.get(userID)) {
				resolve(
					isLean
						? client.databaseCache.users.get(userID).toJSON()
						: client.databaseCache.users.get(userID),
				);
			} else {
				let userData = isLean
					? await client.usersData.findOne({ id: userID }).lean()
					: await client.usersData.findOne({ id: userID });
				if (userData) {
					resolve(userData);
				} else {
					userData = new client.usersData({ id: userID });
					await userData.save();
					resolve(isLean ? userData.toJSON() : userData);
				}
				client.databaseCache.users.set(userID, userData);
			}
		});
	};

	

	
	client.clean = async (text) => {
		if (text && text.constructor.name == "Promise") text = await text;
		if (typeof text !== "string")
			text = require("util").inspect(text, { depth: 1 });

		text = text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203))
			.replace(client.token, client.client.settings.BOT_TOKEN);

		return text;
	};

	client.fetchPunishments = async () => {
		let res = await cezalar.find();
		if (res.length == 0) return 0;
		let last = await res.sort((a, b) => {
			return b.ihlal - a.ihlal;
		})[0];
		return last.ihlal;
	};

	client.shuffle = (array) => {
		var currentIndex = array.length,
			temporaryValue,
			randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	};

	client.üye = async (search, guild) => {
		let member = null;
		if (!search || typeof search !== "string") return;
		if (search.match(/^<@!?(\d+)>$/)) {
			let id = search.match(/^<@!?(\d+)>$/)[1];
			member = await guild.members.fetch(id).catch(() => {});
			if (member) return member;
		}
		if (search.match(/^!?([^#]+)#(\d+)$/)) {
			guild = await guild.fetch();
			member = guild.members.cache.find((m) => m.user.tag === search);
			if (member) return member;
		}
		member = await guild.members.fetch(search).catch(() => {});
		return member;
	};

	client.client_üye = async (search) => {
		let user = null;
		if (!search || typeof search !== "string") return;
		if (search.match(/^!?([^#]+)#(\d+)$/)) {
			let id = search.match(/^!?([^#]+)#(\d+)$/)[1];
			user = client.users.fetch(id).catch((err) => {});
			if (user) return user;
		}
		user = await client.users.fetch(search).catch(() => {});
		return user;
	};

	let kufurler = ["za"];

	client.chatKoruma = async (mesajIcerik) => {
		if (!mesajIcerik) return;
		let inv =
			/(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
		if (inv.test(mesajIcerik)) return true;

		let link =
			/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi;
		if (link.test(mesajIcerik)) return true;

		if (
			kufurler.some((word) =>
				new RegExp("(\\b)+(" + word + ")+(\\b)", "gui").test(
					mesajIcerik,
				),
			)
		)
			return true;
		return false;
	};
};
