const { EmbedBuilder, CommandInteraction, Client, ButtonBuilder, ActionRowBuilder } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Get The Bot Invite Link",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });
    var invite = client.config.links.invite
    var arisa = client.config.links.arisa;
    var support = client.config.links.support;
    const mainPage = new EmbedBuilder()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setColor("#2f3136")
      .setDescription(`>>> • [Click Here To Invite Me To Your Server](${invite})\n• [Click Here To Join My Support Server](${support})\n• [Click Here To Invite Mishi To Your Server](${arisa})`)
    
    interaction.editReply({ embeds: [mainPage] })
  }
}