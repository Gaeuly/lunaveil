const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    description: "Pause the currently playing music",
    args: false,
    usage: "",
    userPrams: [],
    botPrams: ["EMBED_LINKS"],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client, prefix) => {
        const player = client.manager.players.get(message.guild.id);
        if (!player.queue.current) {
            let thing = new EmbedBuilder()
                .setColor("2f3136")
                .setDescription("<:1338107634812977253:1342912739101904926> | No song/s currently playing within this guild.");
            return message.reply({ embeds: [thing] });
        }
        if (player.shoukaku.paused) {
            let thing = new EmbedBuilder()
                .setColor("2f3136")
                .setDescription(`<:1338107648524030063:1342912734634967195> | The player is already **paused**.`);
            return message.reply({ embeds: [thing] });
        }

        await player.pause(true);

        const song = player.queue.current;

        let thing = new EmbedBuilder()
            .setColor("2f3136")
            .setDescription(`<:1338107648524030063:1342912734634967195> | **Paused** - [${song.title}](https://discord.gg/freecode)`);
        return message.reply({ embeds: [thing] });
    },
};
