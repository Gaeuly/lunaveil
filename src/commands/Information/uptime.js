const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: 'uptime',
  category: 'Information',
  aliases: ['up'],
  description: ' ',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const duration1 = Math.round((Date.now() - message.client.uptime)/1000);
    message.reply({ content: `<:1340698405684646120:1342912690988912772> | My Uptime L <t:${duration1}:R>` })
    }
}