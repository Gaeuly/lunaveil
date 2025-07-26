const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");

module.exports = {
  name: 'list',
  aliases: ['pllist'],
  category: 'Playlist',
  description: 'To List The Playlist.',
  args: false,
  usage: 'list',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    let data = await db.find({ UserId: message.author.id });
    if (!data.length) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:1338107634812977253:1342912739101904926> | You Do Not Have Any Playlist`),
        ],
      });
    }
    if (!args[0]) {
      let list = data.map(
        (x, i) => `\`${++i}\` - ${x.PlaylistName} \`${x.Playlist.length}\` - <t:${x.CreatedOn}>`,
      );
      const pages = lodash.chunk(list, 10).map((x) => x.join('\n'));
      let page = 0;
      let List = list.length;

      const embeds = new EmbedBuilder()
        .setAuthor({
          name: `${message.author.username}'s Playlists`,
          iconURI: message.author.displayAvatarURL(),
        })
        .setDescription(pages[page])
        .setFooter({ text: `Playlist (${List} / 10)` })
        .setColor("2f3136");
      return await message.channel.send({ embeds: [embeds] });
    }
  },
};