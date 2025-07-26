const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
  name: '8d',
  category: 'Filters',
  aliases: ['8D'],
  description: 'Set 8D Filter',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

    const msg = await message.channel.send(`<a:loading_pink2:1343939278056587308> | Turning on **8d**. This may take a few seconds...`);

    const player = client.manager.players.get(message.guild.id);
    if (!player) return msg.edit(`<:1338107648524030063:1342912734634967195> | No songs currently playing in this guild.`);
    const { channel } = message.member.voice;
    if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`<:1338107648524030063:1342912734634967195> | You need to be in a same/voice channel.`);

    await player.shoukaku.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      rotation: { rotationHz: 0.2 },
  });
        const embed = new EmbedBuilder()
            .setDescription(`<:1338107648524030063:1342912734634967195> | **8d** Filter Is Now **Enabled**`)
            .setColor("2f3136");

        await delay(5000);
        msg.edit({ content: " ", embeds: [embed] });

  },
};
