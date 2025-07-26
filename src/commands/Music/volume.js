const { EmbedBuilder } = require('discord.js');
const Wait = require('util').promisify(setTimeout);
module.exports = {
  name: 'volume',
  aliases: ['v', 'vol'],
  category: 'Music',
  description: 'Change volume of currently playing music',
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

    if (!args.length) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1338107648524030063:1342912734634967195> | Player Current Volume: **${player.volume * 100}%**`);
      return message.reply({ embeds: [thing] });
    }

    const volume = Number(args[0]);

    if (!volume || volume < 0 || volume > 100) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1338107634812977253:1342912739101904926> | Usage: **${prefix}volume** <Number of volume between 0 - 100>`);
      return message.reply({ embeds: [thing] });
    }

    await player.setVolume(volume / 1);
    Wait(500);
    if (volume > player.volume) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1340687912190083082:1342912612593303715> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    } else if (volume < player.volume) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1340687912190083082:1342912612593303715> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    } else {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1340687912190083082:1342912612593303715> | Volume set to: **${volume}%**`);
      return message.reply({ embeds: [thing] });
    }
  },
};
