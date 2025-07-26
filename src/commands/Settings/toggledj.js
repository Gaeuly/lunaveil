const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "toggledj",
    category: 'Settings',
    description: " Toggle Dj mode",
    args: false,
    usage: "",
    aliases: ["romdj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });

        if(!data) return message.reply({embeds:[new EmbedBuilder().setDescription(`<:1338107634812977253:1342912739101904926> | Don't Have Dj Setup In This Guild`).setColor("2f3136")]})

        let mode = false;
        if(!data.Mode)mode = true;
        data.Mode = mode;
        await data.save();
        if(mode) {
            await message.reply({embeds: [new EmbedBuilder().setDescription(`<:1338107648524030063:1342912734634967195> | Enabled DJ Mode.`).setColor("2f3136")]})
        } else {
           return await message.reply({embeds: [new EmbedBuilder().setDescription(`<:1338107648524030063:1342912734634967195> | Disabled DJ Mode.`).setColor("2f3136")]})
        }
    }
}