const { EmbedBuilder, version, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const os = require('os');
let cpuStat = require("cpu-stat");
module.exports = {
  name: 'status',
  category: 'Information',
  aliases: ['stats', 'botinfo', 'bi'],
  description: 'Show status bot',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let uptime = await os.uptime();

    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor(uptime % (3600 * 24) / 3600);
    let m = Math.floor(uptime % 3600 / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }

      const all = [...client.manager.shoukaku.nodes.values()].map(node =>
        `${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb`).join('\n\n----------------------------\n');

      
    const embed = new EmbedBuilder()
    .setAuthor({name:`Mishi`,
    iconURL:client.user.displayAvatarURL()})
      //.setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Hey, It's **Mishi** A Quality Music Bot With Breathtaking Features.\n\n**__Mishi Stats__**\n<:1340687619129868329:1342912704045912146>  **Online Since:** ${dDisplay+ hDisplay + mDisplay+ sDisplay}\n<:1340698405684646120:1342912690988912772> **Servers:** ${scount}\n<:1340698384251621427:1342912678636687370> **Ping:** ${Math.round(client.ws.ping)}ms\n<:1340696193696792666:1342912607522390078> **Users:**  ${mcount} Members\n<:1340698369743392859:1342912667374981222>  **Commands:** Total ${client.commands.size} | Usable by you (here): 50`)
      .setColor("#2f3136")
      .setTimestamp()
      .setFooter({text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel('Invite').setStyle('Link').setURL(client.config.links.invite).setEmoji('<:1340692810638037084:1342912700262514688>'),

        new ButtonBuilder()
        .setLabel('Support Server')
        .setStyle('Link')
        .setEmoji('<:1340696153599115406:1342912658050908201>')
        .setURL(client.config.links.support)
          );

    message.reply({ embeds: [embed], components: [row] });
    });
}
};