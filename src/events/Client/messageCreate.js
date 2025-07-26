const {
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const db = require("../../schema/prefix.js");
const db2 = require("../../schema/setup");
const db3 = require("../../schema/dj");
const noPrefix = require("../../schema/noprefix");
const os = require("os");
const moment = require("moment");

module.exports = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot || !message.guild) return;

    let data = await db2.findOne({ Guild: message.guildId });
    if (data && data.Channel && message.channelId === data.Channel)
      return client.emit("setupSystem", message);

    let prefix = client.prefix;
    const res = await db.findOne({ Guild: message.guildId });
    if (res && res.Prefix) prefix = res.Prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const userMention = message.author.toString();
      const mainEmbed = new EmbedBuilder()
        .setColor("2f3136")
        .setDescription(
          `> <a:fs_PinkFlowers:1342501109054312498> **Hey ${userMention}!**\n> <:1340696258402058240:1342912675511795733> **Prefix for this server is \`${prefix}\`**\n\n> - # Type \`${prefix}help\` for more info.`
        );

      const systemEmbed = new EmbedBuilder()
        .setColor("2f3136")
        .setTitle("System Information")
        .setDescription(`
>>> - **Bot Name**: ${client.user.username}
- **Bot ID**: ${client.user.id}
- **Servers**: ${client.guilds.cache.size}
- **Channels**: ${client.channels.cache.size}
- **Users**: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}
- **Discord.js**: v${require("discord.js").version}
- **Node.js**: ${process.version}
- **Total Commands**: ${client.commands.size}
- **Uptime**: ${moment.duration(client.uptime).humanize()}
- **Ping**: ${client.ws.ping}ms
- **Platform**: ${os.platform()} (${os.arch()})
- **CPU**: ${os.cpus()[0].model}
- **RAM Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
`);

      const aboutDevsEmbed = new EmbedBuilder()
        .setColor("2f3136")
        .setTitle("About Devs")
        .setDescription(
          "**`.01`** <a:mishidot:1342882756840915055> ** Bot Dev | [Dexky](https://discord.gg/hdCzYfhrk8)**\n**`.02`** <a:mishidot:1342882756840915055> **Own | [Plasma](https://discord.gg/hdCzYfhrk8) | [Clone](https://discord.gg/hdCzYfhrk8)**"
        );

      const linksEmbed = new EmbedBuilder()
        .setColor("2f3136")
        .setTitle("Links")
        .setDescription(
          "<:1340692810638037084:1342912700262514688> **Invite Link: [Click Me](https://discord.com/oauth2/authorize?client_id=1297163853733433366)**\n<:1340696153599115406:1342912658050908201> **Support Server: [Click Me](https://discord.gg/hdCzYfhrk8)**"
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("home")
          .setLabel("Home")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("system")
          .setLabel("System")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("about")
          .setLabel("About Devs")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId("links")
          .setLabel("Links")
          .setStyle(ButtonStyle.Secondary)
      );

      const sent = await message.channel.send({
        embeds: [mainEmbed],
        components: [row],
      });

      const filter = (i) => i.user.id === message.author.id;
      const collector = sent.createMessageComponentCollector({
        filter,
        time: 60000,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "home")
          return i.update({ embeds: [mainEmbed], components: [row] });
        if (i.customId === "system")
          return i.update({ embeds: [systemEmbed], components: [row] });
        if (i.customId === "about")
          return i.update({ embeds: [aboutDevsEmbed], components: [row] });
        if (i.customId === "links")
          return i.update({ embeds: [linksEmbed], components: [row] });
      });
    }

    const isNoPrefix = await noPrefix.findOne({ User: message.author.id });

    let args;
    let commandName;

    if (isNoPrefix) {
      args = message.content.trim().split(/ +/);
      commandName = args.shift().toLowerCase();
    } else {
      const escapeRegex = (str) =>
        str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
      );
      if (!prefixRegex.test(message.content)) return;

      const matchedPrefix = message.content.match(prefixRegex)[0];
      args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
      commandName = args.shift().toLowerCase();
    }

    const command =
      client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases?.includes(commandName));
    if (!command) return;

    console.log(`[CMD] Command triggered: ${command.name}`);

    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.SendMessages
      )
    )
      return;

    const embed = new EmbedBuilder().setColor("2f3136");

    try {
      await command.execute(message, args, client, prefix);
    } catch (e) {
      console.error(`[ERROR] while executing ${command.name}:`, e);
      embed.setDescription(
        `❌ | There was an error executing the command: \`${command.name}\``
      );
      return message.channel.send({ embeds: [embed] });
    }
  },
};