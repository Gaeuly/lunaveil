const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['c'],
  category: 'Music',
  description: 'Clear Music Queue',
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

    if (!player.queue) {
      let thing = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription('<:1338107634812977253:1342912739101904926> | No song/s currently playing within this guild.');
      return message.reply({ embeds: [thing] });
    }
    const but = new ButtonBuilder().setCustomId('cqueue').setLabel('Queue').setStyle('Secondary');
    const but2 = new ButtonBuilder().setCustomId('cfilter').setLabel('Filter').setStyle('Secondary');

    const but_ = new ButtonBuilder()
      .setCustomId('dqueue')
      .setLabel('Queue')
      .setStyle('Secondary')
      .setDisabled(true);
    const but_2 = new ButtonBuilder()
      .setCustomId('dfilter')
      .setLabel('Filter')
      .setStyle('Secondary')
      .setDisabled(true);


    const row = new ActionRowBuilder().addComponents(but, but2);

    let thing = new EmbedBuilder()
      .setColor("2f3136")
      .setDescription(`**Which one do you want to clear?**`);
    const m = await message.reply({ embeds: [thing], components: [row] });
    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `<:1338107634812977253:1342912739101904926> | Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      await m
        .edit({
          components: [
            new ActionRowBuilder().addComponents(but.setDisabled(true), but2.setDisabled(true)),
          ],
        })
        .catch(() => {});
    });
    collector.on('collect', async (b) => {
      if (!b.deferred) await b.deferUpdate();
      if (b.customId === 'cqueue') {
         if (!player.queue[0]) {
         return await m.edit({ embeds: [new EmbedBuilder().setDescription('<:1338107634812977253:1342912739101904926> | There Is **Nothing** In The Queue').setColor("2f3136")] , components: [] })
    }
        await player.queue.clear();
        await m.edit({
          embeds: [new EmbedBuilder().setDescription('**Which one do you want to clear?**').setColor("2f3136")],
          components: [new ActionRowBuilder().addComponents(but_, but_2)],
        });
        return await m.reply({ embeds: [new EmbedBuilder().setDescription('<:1338107648524030063:1342912734634967195> | Cleared the Queue.').setColor("2f3136")] });
      }

      if (b.customId === 'cfilter') {
        player.shoukaku.clearFilters()
        await m.edit({
          embeds: [new EmbedBuilder().setDescription('**Which one do you want to clear?**').setColor("2f3136")],
          components: [new ActionRowBuilder().addComponents(but_, but_2)],
        });
        return await m.reply({
          embeds: [new EmbedBuilder().setDescription('<:1338107648524030063:1342912734634967195> | Cleared the Filter.').setColor("2f3136")],
        });
      }
    });
  },
};
