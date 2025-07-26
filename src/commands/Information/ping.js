const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Check Ping Bot",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    await message.reply({ content: "**Getting The Latency**" }).then(async (msg) => {
      var ping = msg.createdAt - message.createdAt;
      var api_ping = client.ws.ping;

      const PingEmbed = new EmbedBuilder()
        .setColor("#2f3136")
        .setAuthor({ name: `Ping ${api_ping}ms`, iconURL : message.author.displayAvatarURL({ dynamic: true })})
      await msg.edit({ content: "** **", embeds: [PingEmbed] })
    })
  }
}