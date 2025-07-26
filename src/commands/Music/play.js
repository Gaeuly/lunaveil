const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p'],
  description: 'Plays audio from YouTube or Soundcloud',
  args: true,
  usage: 'Song URL or Name To Play',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

    const youtube = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(`<:1338107634812977253:1342912739101904926> | We Don't Support This Platform.`)

    if(message.content.includes(`youtu.be`))
      return message.reply({embeds: [youtube] })
     if(message.content.includes(`youtube.com`))
      return message.reply({embeds: [youtube] })
     else if(message.content.includes(`y2u.be`))
      return message.reply({embeds: [youtube]})

    if (!message.guild.members.me.permissions.has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak]))
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              `<:1338107634812977253:1342912739101904926> | I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;

    const { channel } = message.member.voice;

    if (
      !message.guild.members.me
        .permissionsIn(channel)
        .has([PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak])
    )
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(
              `<:1338107634812977253:1342912739101904926> | I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const query = args.join(' ');

    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });

    const result = await player.search(query, { requester: message.author });

    if (!result.tracks.length) return message.reply({ content: '<:1338107634812977253:1342912739101904926> | No result was found' });

    const tracks = result.tracks;

   if (result.type === 'PLAYLIST') for (let track of tracks) player.queue.add(track);
   else player.queue.add(tracks[0]);

   if (!player.playing && !player.paused) player.play();
    return message.reply(
      result.type === 'PLAYLIST'
        ? {
            embeds: [
              new EmbedBuilder()
                .setColor("2f3136")
                .setDescription(
                  `<:1340698435124330507:1342912687620886678> | Queued **${tracks.length}** from **${result.playlistName}**`,
                ),
            ],
          }
        : {
            embeds: [
              new EmbedBuilder()
                .setColor("2f3136")
                .setDescription(`<:1340698435124330507:1342912687620886678> | Queued - [${tracks[0].title}](https://discord.gg/)`),
            ],
          },
    );
  },
};
