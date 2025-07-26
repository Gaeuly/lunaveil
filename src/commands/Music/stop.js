const { EmbedBuilder } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
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
    
    player.queue.clear();
    player.data.delete("autoplay")
    player.loop = 'none';
    player.playing = false;
    player.paused = false;
    await player.skip();
    Wait(500);
    let thing = new EmbedBuilder()
      .setColor("2f3136")
      .setDescription(`<:1338107648524030063:1342912734634967195> | Stopped the music`);
    message.reply({ embeds: [thing] });
  },
};
