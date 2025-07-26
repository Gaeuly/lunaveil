const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Shuffle queue',
  args: false,
  usage: '',
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
    let thing = new EmbedBuilder()
      .setDescription(`<:1338107648524030063:1342912734634967195> | Shuffled the queue`)
      .setColor("2f3136");
    await player.queue.shuffle();
    return message.reply({ embeds: [thing] }).catch((error) => client.logger.log(error, 'error'));
  },
};
