const { EmbedBuilder, CommandInteraction, Client } = require('discord.js');
const { ActionRowBuilder, ButtonBuilder } = require('discord.js');
module.exports = {
  name: 'support',
  description: 'return websocket ping',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    var support = client.config.links.support;
    var color = client.embedColor;
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('Support Server').setStyle('Link').setURL(support),
    );
    const embed = new EmbedBuilder()
      .setDescription(`>>> • [Click Here To Join Support Server Or Click Below](${support})`)
      .setColor('#2f3136');
    await interaction.editReply({ embeds: [embed], components: [row] });
  },
};
