const Discord = require("discord.js");

module.exports = {
	conf: {
		name: "taskmenu",
		usage: ".taskmenu",
		category: "BotOwner",
		description: "Task menü mesajını atar.",
		aliases: ["taskmenu", "taskmenü"],
	},

	async run(client, message, args) {
		if (!client.settings.BOT_OWNERS.includes(message.author.id)) return;

		const embed = new Discord.EmbedBuilder()
			.setAuthor({
				name: message.guild.name,
				iconURL: message.guild.iconURL(),
			})
			.setColor("Aqua")
			.setDescription(
				`
Görev detayı ve durumu hakkında bilgi almak için lütfen \`.task\` komutunu kullanın.
Aşağıda belirtilen (5) görevin hepsini seçer ve 24 saat geçmeden tamamlarsanız ekstra puan kazanırsınız.`,
			)
			.addFields({
				name: `${client.emojis.cache.find(
					(x) => x.name === "zade_ses",
				)} Ses Görevi`,
				value: `Bu sorumluluğu seçerseniz belirtilen süre kadar ses kanallarında vakit geçirmelisiniz.`,
			})
			.addFields({
				name: `${client.emojis.cache.find(
					(x) => x.name === "zade_mesaj",
				)} Mesaj Görevi`,
				value: `Belirtilen sayı kadar herhangi bir kanala mesaj atmalısınız.`,
			})
			.addFields({
				name: `${client.emojis.cache.find(
					(x) => x.name === "zade_ses",
				)} Taglı Görevi`,
				value: `Tagımızı yeni alan kişileri \`.taglı <@üye>\` komutuyla taglı olarak işaretlemelisiniz.`,
			})
			.addFields({
				name: `${client.emojis.cache.find(
					(x) => x.name === "zade_cookie",
				)} Cookie Görevi`,
				value: `Arkadaşlarından kurabiye alman gerekiyor, \`.cookie <@üye>\` komutunu kullanmalarını isteyerek bunu başarabilirsin.`,
			})
			.addFields({
				name: `${client.emojis.cache.find(
					(x) => x.name === "zade_ses",
				)} Davet Görevi`,
				value: `Sunucumuza üye davet etmen gerekir.`,
			})
			.setFooter({
				text: "Seçtiğiniz görevler 24 saat sonra silinir.",
			});

		const row = new Discord.ActionRowBuilder().addComponents(
			new Discord.StringSelectMenuBuilder()
				.setCustomId("task")
				.setPlaceholder("Görev almak için tıkla.")
				.addOptions([
					{
						label: "🔊 Ses Görevi",
						description:
							"Rastgele bir süre ses kanallarında vakit geçirmeniz gerekir.",
						value: "1",
					},
					{
						label: "💬 Mesaj Görevi",
						description:
							"Chat kanalında rastgele bir mesaj sayısına ulaşman gerekir.",
						value: "2",
					},
					{
						label: "👤 Taglı Görevi",
						description:
							"Rastgele bir sayı taglı kullanıcı işaretlemeniz gerekir.",
						value: "3",
					},
					{
						label: "🍪 Cookie Görevi",
						description:
							"Rastgele bir sayı arkadaşlarından cookie alman gerekir.",
						value: "4",
					},
					{
						label: "👤 Davet Görevi",
						description:
							"Rastgele bir sayı sunucumuza üye davet etmelisin.",
						value: "5",
					},
				]),
		);

		message.channel.send({
			embeds: [embed],
			components: [row],
		});
	},
};
