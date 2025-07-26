const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "removedj",
    category: 'Settings',
    description: "Remove Dj Role",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        if (data) {
            await data.delete()
            return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:1338107648524030063:1342912734634967195> | Successfully Removed All DJ Roles.`).setColor("2f3136")] })
        } else return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:1338107634812977253:1342912739101904926> | Don't Have Dj Setup In This Guild`).setColor("2f3136")] })

    }
}
