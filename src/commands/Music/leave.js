const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    aliases: ["dc"],
    category: "Music",
    description: "Leave voice channel",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {

        const player = client.manager.players.get(message.guild.id);
        
        const emojiLeave = message.client.emoji.leave;

        await player.destroy(message.guild.id);

        let thing = new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:1338107648524030063:1342912734634967195> | Leaved the voice channel`);
        return message.reply({ embeds: [thing] });
    },
};