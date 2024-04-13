const Task = require("../models/task");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
module.exports = async (interaction) => {
		if (interaction.customId === "task") {
			if (
				!interaction.member.roles.cache.some((r) =>
					client.settings.STAFF_ROLE.includes(r.id),
				)
			)
				return interaction.reply({
					content: `Sorumluluk seçebilmek için <@&${client.settings.STAFF_ROLE}> rolüne sahip olmalısın.`,
					ephemeral: true,
				});
			const task = await Task.findOne({
				userID: interaction.user.id,
				tasknumber: interaction.values[0],
			});
			if (task && task.tasknumber)
				return interaction.reply({
					content: "zaten bu göreve sahipsin",
					ephemeral: true,
				});
			if (interaction.values[0] === "1") {
				let type = "ses";
				let target = 1000 * 60 * 60 * 1;
				let description = `Seste ${moment
					.duration(target)
					.format("H [saat], m [dk]")} vakit geçir!`;
				let point = Math.floor(Math.random() * 250 + 75);

				await client.taskAdd(
					interaction,
					type,
					target,
					point,
					description,
				);

				interaction.reply({
					content: `Başarıyla **ses aktifliği** görevini aldın.
\`Herhangi bir ses kanalında ${moment
						.duration(target)
						.format("H [saat], m [dk]")} süre geçirmelisin.
.task komutunu kullanarak detayları öğrenebilirsin.\``,
					ephemeral: true,
				});
			} else if (interaction.values[0] === "2") {
				let type = "mesaj";
				let target = Math.floor(Math.random() * 100 + 100);
				let description = `Metin kanallarında ${target} mesaj at!`;
				let point = Math.floor(Math.random() * 150 + 100);

				await client.taskAdd(
					interaction,
					type,
					target,
					point,
					description,
				);
				interaction.reply({
					content: `Başarıyla **mesaj aktifliği** görevini aldın. 
\`Herhangi bir mesaj kanalına ${target} mesaj göndermelisin.
.task komutunu kullanarak detayları öğrenebilirsin.\``,
					ephemeral: true,
				});
			} else if (interaction.values[0] === "3") {
				let type = "taglı";
				let target = Math.floor(Math.random() * 5 + 5);
				let description = `${target} kişiye tag aldır!`;
				let point = Math.floor(Math.random() * 200 + 80);

				await client.taskAdd(
					interaction,
					type,
					target,
					point,
					description,
				);
				interaction.reply({
					content: `Başarıyla **taglı çekme** görevini aldın.
\`Tagımızı yeni almış ${target} kullanıcıyı .taglı <@üye> komutu ile belirtmelisiniz.
.task komutunu kullanarak detayları öğrenebilirsin.\``,
					ephemeral: true,
				});
			} else if (interaction.values[0] === "4") {
				let type = "cookie";
				let target = Math.floor(Math.random() * 3 + 2);
				let description = `Arkadaşlarından hediye ${target} kurabiye al!`;
				let point = Math.floor(Math.random() * 150 + 100);

				await client.taskAdd(
					interaction,
					type,
					target,
					point,
					description,
				);
				interaction.reply({
					content: `Başarıyla **cookie** görevini aldın.
\`${target} arkadaşından .cookie ${interaction.user.tag} komutunu kullanmalarını isteyerek bunu başarabilirsin.
.task komutunu kullanarak detayları öğrenebilirsin.\``,
					ephemeral: true,
				});
			} else if (interaction.values[0] === "5") {
				let type = "davet";
				let target = Math.floor(Math.random() * 2 + 1);
				let description = `Sunucuya ${target} üye davet et`;
				let point = Math.floor(Math.random() * 150 + 100);

				await client.taskAdd(
					interaction,
					type,
					target,
					point,
					description,
				);
				interaction.reply({
					content: `Başarıyla **davet** görevini aldın.
\`Sunucuya ${target} üye davet etmelisin.
.task komutunu kullanarak detayları öğrenebilirsin.\``,
					ephemeral: true,
				});
			}
		}
	}
	module.exports.conf = {
		name: "interactionCreate",
	};
	