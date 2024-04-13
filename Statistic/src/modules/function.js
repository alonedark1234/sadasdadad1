const Discord = require("discord.js");
const can = require("pretty-ms");

module.exports = async (client) => {
	client.checkReward = async (member, voiceModel, client) => {
		const voiceRewards = client.settings.VOICE_REWARDS.filter(
			(reward) =>
				member.guild.roles.cache.has(reward.role) &&
				reward.rank <= voiceModel.voice &&
				!member.roles.cache.has(reward.role),
		).map((reward) => reward.role);
		const textRewards = client.settings.TEXT_REWARDS.filter(
			(reward) =>
				member.guild.roles.cache.has(reward.role) &&
				reward.rank <= voiceModel.messages &&
				!member.roles.cache.has(reward.role),
		).map((reward) => reward.role);
		const channel = member.guild.channels.cache.get(
			client.settings.REWARD_CHANNEL,
		);
		if (voiceRewards.length > 0) {
			await member.roles.add(voiceRewards);
			if (channel)
				await channel.send(
					`🎉 ${member.toString()} tebrikler! Ses istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${voiceRewards
						.map((id) => member.guild.roles.cache.get(id)?.name)
						.join(", ")}"** rolüne terfi edildin!`,
				);
		}
		if (textRewards.length > 0) {
			await member.roles.add(textRewards);
			if (channel)
				await channel.send(
					`🎉 ${member.toString()} tebrikler! Mesaj istatistiklerin bir sonraki seviyeye atlaman için yeterli oldu. **"${textRewards
						.map((id) => member.guild.roles.cache.get(id)?.name)
						.join(", ")}"** rolüne terfi edildin!`,
				);
		}
	};

	client.progressBar = (value, maxValue, size) => {
		const progress = Math.round(
			size * (value / maxValue > 1 ? 1 : value / maxValue),
		);
		const emptyProgress = size - progress > 0 ? size - progress : 0;

		const progressText = client.settings.emojis.fill.repeat(progress);
		const emptyProgressText =
			client.settings.emojis.empty.repeat(emptyProgress);

		return emptyProgress > 0
			? progress === 0
				? client.settings.emojis.emptyStart +
				  progressText +
				  emptyProgressText +
				  client.settings.emojis.emptyEnd
				: client.settings.emojis.fillStart +
				  progressText +
				  emptyProgressText +
				  client.settings.emojis.emptyEnd
			: client.settings.emojis.fillStart +
					progressText +
					emptyProgressText +
					client.settings.emojis.fillEnd;
	};

	client.taskAdd = async (interaction, type, hedef, puan, text) => {
		const Task = require("../models/task");
		return await new Task({
			userID: interaction.member.id,
			situation: true,
			completed: false,
			level: 0,
			target: hedef,
			point: puan,
			type: type,
			tasknumber: interaction.values[0],
			description: text,
			date: Date.now(),
			end: Date.now() + 1000 * 60 * 60 * 24,
		}).save();
	};
	client.capitalizeIt = (str) => {
		if (str && typeof str === "string") {
			str = str.split(" ");
			for (var i = 0, x = str.length; i < x; i++) {
				if (str[i]) {
					str[i] = str[i][0].toUpperCase() + str[i].substr(1);
				}
			}
			return str.join(" ");
		}
		return str;
	};

	client.taskUpdate = async (type, count, member) => {
		const task = require("../models/task");
		const points = require("../models/points");

		const Task = await task.find({
			userID: member.id,
			type: type,
			situation: true,
		});
		const aktifTamam = await task.find({
			userID: member.id,
			situation: true,
			completed: true,
		});
		Task.forEach(async (task) => {
			task.level += Number(count);
			if (task.completed == false && task.level >= task.target) {
				task.completed = true;

				await points.findOneAndUpdate(
					{ guildID: member.guild.id, userID: member.id },
					{ $inc: { points: Number(task.point) } },
					{ upsert: true },
				);
				if (aktifTamam.length + 1 >= 5)
					await points.findOneAndUpdate(
						{ guildID: member.guild.id, userID: member.id },
						{ $inc: { points: Number(1000) } },
						{ upsert: true },
					);
				if (
					client.channels.cache.find(
						(x) => x.name === "görev-dağıtım",
					)
				)
					client.channels.cache
						.find((x) => x.name === "görev-dağıtım")
						.send(
							`Tebrikler, ${member.toString()} **${
								type.charAt(0).toLocaleUpperCase() +
								type.slice(1)
							}** isimli görevini tamamlayarak ${Number(
								task.point,
							)} puan kazandın.`,
						);
			}
			await task.save();
		});
	};

	client.ms = (milliseconds) => {
		const roundTowardsZero = milliseconds > 0 ? Math.floor : Math.ceil;

		return {
			days: roundTowardsZero(milliseconds / 86400000),
			hours: roundTowardsZero(milliseconds / 3600000) % 24,
			minutes: roundTowardsZero(milliseconds / 60000) % 60,
			seconds: roundTowardsZero(milliseconds / 1000) % 60,
			milliseconds: roundTowardsZero(milliseconds) % 1000,
			microseconds: roundTowardsZero(milliseconds * 1000) % 1000,
			nanoseconds: roundTowardsZero(milliseconds * 1e6) % 1000,
		};
	};

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
