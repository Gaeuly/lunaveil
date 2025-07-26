const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['j'],
  category: 'Music',
  description: 'Join voice channel',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {

    const { channel } = message.member.voice;
    const player = client.manager.players.get(message.guild.id);
    if (player) {
      return await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(` I'm already connected to <#${player.voiceId}> voice channel!`),
        ],
      });
    } else {
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

      await client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
      });

      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(
          `<:1338107648524030063:1342912734634967195> | **Join the voice channel**\nJoined <#${channel.id}> and bound to <#${message.channel.id}>`,
        );
      return message.reply({ embeds: [thing] });
    }
  },
};
