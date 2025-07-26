const { EmbedBuilder } = require("discord.js");
const db = require("../../schema/dj");

module.exports = {
    name: "adddj",
    category: 'Settings',
    description: "Set Dj Role",
    args: false,
    usage: "",
    aliases: ["adj"],
    userPrams: ['MANAGE_GUILD'],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    execute: async (message, args, client, prefix) => {

        let data = await db.findOne({ Guild: message.guild.id });
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:1338107634812977253:1342912739101904926> | Please add a Role via ping, @role!`).setColor("2f3136")] })
        if (!data) {
           data = new db({
                Guild: message.guild.id,
                Roles: [role.id],
                Mode: true
            })
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:1338107648524030063:1342912734634967195> | Successfully Added DJ Role ${role}.`).setColor("2f3136")] })
        } else {
            let rolecheck = data.Roles.find((x) => x === role.id);
            if (rolecheck) return message.reply({ embeds: [new EmbedBuilder().setDescription(`<:1338107634812977253:1342912739101904926> | Role Already Exists in List.`).setColor("2f3136")] })
            data.Roles.push(role.id);
            await data.save();
            return await message.channel.send({ embeds: [new EmbedBuilder().setDescription(`<:1338107648524030063:1342912734634967195> | Successfully Added New DJ Role ${role}.`).setColor("2f3136")] })

        }
    }
}