const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Remove song from the queue',
  args: true,
  usage: 'Number of song in queue',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new EmbedBuilder().setColor("2f3136").setDescription('<:1338107634812977253:1342912739101904926> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1338107634812977253:1342912739101904926> | No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return message.reply({ embeds: [thing] });
    }

    const song = player.queue[position];

    await player.queue.splice(position, 1);

    const emojieject = client.emoji.remove;

    let thing = new EmbedBuilder()
      .setColor("2f3136")
      .setDescription(`<:1338107648524030063:1342912734634967195> | Removed - [${song.title}](https://discord.gg/)`);
    return message.reply({ embeds: [thing] });
  },
};
