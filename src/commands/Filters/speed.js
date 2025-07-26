const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
  name: 'speed',
  category: 'Filters',
  aliases: ['sped'],
  description: 'Set Speed Filter',
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
    const msg = await message.channel.send(`<a:loading_pink2:1343939278056587308> | Turning on **Speed**. This may take a few seconds...`);

    const player = client.manager.get(message.guild.id);
    if(!player) return msg.edit(`<:1338107634812977253:1342912739101904926> | No songs currently playing in this guild.`);
    const { channel } = message.member.voice;
    if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit(`<:1338107634812977253:1342912739101904926> | You need to be in a same/voice channel.`);

    await player.shoukaku.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      timescale: {
        speed: 1.501,
        pitch: 1.245,
        rate: 1.921,
      },
    });

const sbed = new EmbedBuilder()
    .setDescription(`<:1338107648524030063:1342912734634967195> | **Speed** Filter Is Now **Enabled**`)
    .setColor("2f3136");

await delay(5000);
msg.edit({ content: " ", embeds: [sbed] });
}
};