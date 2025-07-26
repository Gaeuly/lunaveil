const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'resume',
  aliases: ['r'],
  category: 'Music',
  description: 'Resume currently playing music',
  args: false,
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
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new EmbedBuilder().setColor("2f3136").setDescription('<:1338107634812977253:1342912739101904926> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.shoukaku.paused) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1338107634812977253:1342912739101904926> | The player is already **resumed**.`);
      return message.reply({ embeds: [thing] });
    }

    await player.pause(false);

    let thing = new EmbedBuilder()
      .setDescription(`<:1338107648524030063:1342912734634967195> | **Resumed** - [${song.title}](https://discord.gg/)`)
      .setColor("2f3136");
    return message.reply({ embeds: [thing] });
  },
};
