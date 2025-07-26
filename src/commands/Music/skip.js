const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'To skip the current playing song.',
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
    
    if (player.queue.size == 0) {
       let noskip = new EmbedBuilder()
       .setColor("2f3136")
       .setDescription(`<:1338107634812977253:1342912739101904926> | No more songs left in the queue to skip.`);
       return message.reply({ embeds: [noskip] });
   }

    await player.skip();

    let thing = new EmbedBuilder()
      .setDescription(`<:1338107648524030063:1342912734634967195> | **Skipped** - [${player.queue.current.title}](https://discord.gg/)`)
      .setColor("2f3136");
    return message.reply({ embeds: [thing] }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 3000);
    });
  },
};
