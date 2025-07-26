const { EmbedBuilder } = require("discord.js");
const noPrefix = require("../../schema/noprefix"); 

module.exports = {
  name: "npadd",
  category: "Owner",
  description: "Add a user to the no-prefix system.",
  args: true,
  usage: "<user>",
  userPrams: [],
  botPrams: ["EMBED_LINKS"],
  owner: true, 
  execute: async (message, args, client, prefix) => {
    const user = message.mentions.users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return message.reply({
        content: "Please mention a user or provide their ID.",
      });
    }

    const data = await noPrefix.findOne({ User: user.id });
    if (data) {
      return message.reply({
        content: "This user is already in the no-prefix system.",
      });
    }

    await noPrefix.create({ User: user.id });

    const embed = new EmbedBuilder()
      .setColor("#2f3136")
      .setDescription(`✅ Successfully added ${user.tag} to the no-prefix system.`);

    await message.reply({ embeds: [embed] });
  },
};