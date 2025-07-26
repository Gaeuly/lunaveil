const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    category: "Music",
    description: "Toggle music autoplay",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);
        player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", message.author);
            let thing = new EmbedBuilder()
                .setColor("2f3136")
                .setTimestamp()
                .setDescription(`<:1338107648524030063:1342912734634967195> | Autoplay is now ${player.data.get("autoplay") ? "**enabled**" : "**disabled**"}.`)
            return message.channel.send({ embeds: [thing] });
        }
    
}
