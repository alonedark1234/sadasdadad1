const Discord = require("discord.js");
const tasks = require("../../models/task");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	conf: {
		name: "task",
		usage: ".task",
		category: "Staff",
		description: "Görev durumunuzu görüntülersiniz.",
		aliases: [
			"task",
			"tasks",
			"gorev",
			"görev",
			"gorevler",
			"görevler",
			"sorumluluk",
		],
	},

	async run(client, message, args) {
		if (
			!message.member.roles.cache.some((r) =>
				client.settings.STAFF_ROLE.includes(r.id),
			)
		)
			return;
		const member =
			message.mentions.members.first() ||
			message.guild.members.cache.get(args[0]) ||
			message.member;
		const user = member.user;

		const task = await tasks.find({ userID: user.id });
		if (!task || task.length <= 0)
			return message.reply(
				`Aktif bir göreviniz bulunmamaktadır. Lütfen yetkili sorumluluk kanalından sorumluluk seçiniz.`,
			);

		const embed = new Discord.EmbedBuilder()
			.setColor("Aqua")
			.setFooter({
				text: `Seçtiğiniz görevler 24 saat sonra sıfırlanır.`,
				iconURL: message.author.avatarURL({ dynamic: true }),
			})
			.setAuthor({
				name: user.tag,
				iconURL: user.avatarURL({ dynamic: true }),
			})
			.setDescription(
				`${
					task.length == 5
						? `**${
								task.length
						  }** görevi tamamlamak sana fazladan ${client.emojis.cache.find(
								(x) => x.name === "zade_xp",
						  )} **500** Puan kazandıracak!\n`
						: `Bütün görevleri seçerek fazladan **500** puan kazanabilirsin!`
				}`,
			)
			.setThumbnail(
				"https://cdn.discordapp.com/emojis/1054127444929560636.gif?size=100&quality=lossless",
			)
			.setTimestamp();

		task.map((task) => {
			const emoji = task.type
				.replace(
					/mesaj/i,
					client.emojis.cache.find((x) => x.name === "zade_mesaj"),
				)
				.replace(
					/ses/i,
					client.emojis.cache.find((x) => x.name === "zade_ses"),
				)
				.replace(
					/taglı/i,
					client.emojis.cache.find((x) => x.name === "zade_ses"),
				)
				.replace(
					/cookie/i,
					client.emojis.cache.find((x) => x.name === "zade_cookie"),
				)
				.replace(
					/davet/i,
					client.emojis.cache.find((x) => x.name === "zade_ses"),
				);
			embed.addFields({
				name: `${task.description}`,
				value: `${emoji} ${client.progressBar(
					task.level,
					task.target,
					8,
				)} ${
					task.type == "ses"
						? `\`${moment
								.duration(task.level)
								.format("H [saat], m [dk]")} / ${moment
								.duration(task.target)
								.format("H [saat], m [dk]")}\``
						: ` \`${
								task.level >= task.target
									? "Tamamlandı."
									: `${task.level} / ${task.target}`
						  }\``
				}\n**Ödül:** ${client.emojis.cache.find(
					(x) => x.name === "zade_hazine",
				)} \`${task.point}\` Puan \n**Görev bitiş:** <t:${Math.floor(
					task.end / 1000,
				)}:R>`,
			});
		});

		return message.channel.send({ embeds: [embed] });
	},
};
