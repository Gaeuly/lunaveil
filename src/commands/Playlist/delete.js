const { EmbedBuilder } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'delete',
  aliases: ['pldelete'],
  category: 'Playlist',
  description: 'Delete your saved playlist.',
  args: false,
  usage: 'playlist name to delete playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:1338107634812977253:1342912739101904926> | You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:1338107634812977253:1342912739101904926> | You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    await data.delete();
    const embed = new EmbedBuilder()
      .setColor("2f3136")
      .setDescription(`<a:pristo_delete:1119489535848493167> | Successfully deleted ${Name} playlist`);
    return message.channel.send({ embeds: [embed] });
  },
};
