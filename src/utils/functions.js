const { Message, EmbedBuilder, Client, TextChannel, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require("../schema/setup");
const { convertTime } = require("./convert");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");
const k = "OK | "
/**
 * 
 * @param {TextChannel} channel 
 * @param {String} args 
 */

async function oops(channel, args) {
    try {
        let embed1 = new EmbedBuilder().setColor("#2f3136").setDescription(`${args}`);

        const m = await channel.send({
            embeds: [embed1]
        });

        setTimeout(async () => await m.delete().catch(() => { }), 12000);
    } catch (e) {
        return console.error(k, e)
    }
};


/**
 * 
 * @param {String} query 
 * @param {KazagumoPlayer} player 
 * @param {Message} message 
 * @param {Client}  client
 */

function neb(embed, player, client) {
    const config = require("../config")
    let icon = config.links.bg;

    return embed.setDescription(`[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${player.queue.current.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });
};
/**
 * 
 * @param {KazagumoPlayer} player 
 * @param {Client} client
 * @returns 
 */
async function autoplay(player, client) {

    const searched = `https://www.youtube.com/watch?v=${player.data.get("autoplaySystem")}&list=RD${player.data.get("autoplaySystem")}`;
    let requester = player.data.get("requester");
    if (!searched[0]) {
        return message.channel.send({ embeds: [new EmbedBuilder().setColor("2f3136").setDescription(`Unable to autoplay from the previous track. Destroyed the player.`)] });
    }
    const { tracks } = await player.search(searched, { requester: requester });
    await player.queue.add(tracks[1]);
    await player.queue.add(tracks[2]);
    return player.play();
}
/**
 * 
 * @param {String} query 
 * @param {KazagumoPlayer} player 
 * @param {Message} message 
 * @param {Client}  client
 */

async function playerhandler(query, player, message) {
    let m;
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;
    let d = await db.findOne({ Guild: message.guildId });
    let n = new EmbedBuilder().setColor(message.client.embedColor);

    try {
        if (d) m = await message.channel.messages.fetch(d.Message, { cache: true });
    } catch (e) { };

    if (!message.guild.members.me.voice.channel || player.state !== "CONNECTED") player = await message.client.manager.createPlayer({
        guildId: message.guild.id,
        voiceId: message.member.voice.channel.id,
        textId: message.channel.id,
        deaf: true,
    });

    const result = await player.search(query, { requester: message.author });
    if (!result.tracks.length) return message.reply({ content: '<:1338107634812977253:1342912739101904926> | No result was found' });
    const tracks = result.tracks;
    if (result.type === 'PLAYLIST') for (let track of tracks) player.queue.add(track);
    else player.queue.add(tracks[0]);
    if (!player.playing && !player.paused) await player.play();
    return message.channel.send(
        result.type === 'PLAYLIST'
            ? {
                embeds: [
                    new EmbedBuilder()
                        .setColor("2f3136")
                        .setDescription(
                            `<:1338107648524030063:1342912734634967195> | Queued **${tracks.length}** from **${result.playlistName}**`,
                        ),
                ],
            }
            : {
                embeds: [
                    new EmbedBuilder()
                        .setColor("2f3136")
                        .setDescription(`<:1338107648524030063:1342912734634967195> | Queued [${tracks[0].title}](${tracks[0].uri})`),
                ],
            },
    ).then((a) => setTimeout(async () => await a.delete().catch(() => { }), 5000)).catch(() => { });

};

/**
 * 
 * @param {String} msgId
 * @param {TextChannel} channel 
 * @param {KazagumoPlayer} player 
 * @param {KazagumoTrack} track 
 * @param {Client} client
 */

async function trackStartEventHandler(msgId, channel, player, track, client) {
    try {

        let icon = `${track.thumbnail ? track.thumbnail : `https://img.spotify.com/track/${player.queue.current.identifier}/hqdefault.jpg`}` || client.config.links.bg;

        let message;
        try {

            message = await channel.messages.fetch(msgId, { cache: true });

        } catch (error) { };


        if (!message) {

            let embed1 = new EmbedBuilder().setColor(client.embedColor).setDescription(`[${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });

            const but1 = new ButtonBuilder().setCustomId(`${player.guildId}pause`).setEmoji(`<:1340698422503674006:1342912682659151923>`).setStyle('Secondary')
            const but2 = new ButtonBuilder().setCustomId(`${player.guildId}previous`).setEmoji(`⏮️`).setStyle('Secondary')
            const but3 = new ButtonBuilder().setCustomId(`${player.guildId}skip`).setEmoji(`⏭️`).setStyle('Secondary')
            const but4 = new ButtonBuilder().setCustomId(`${player.guildId}voldown`).setEmoji(`<:1340687889515806720:1342912610244362270>`).setStyle('Secondary')
            const but5 = new ButtonBuilder().setCustomId(`${player.guildId}volup`).setEmoji(`<:1340687912190083082:1342912612593303715>`).setStyle('Secondary')

            const row = new ActionRowBuilder().addComponents(but4, but2, but1, but3, but5)

            const m = await channel.send({
                content: "__**Join a voice channel and queue songs by name/url.**__\n\n",
                embeds: [embed1],
                components: [row]
            });

            return await db.findOneAndUpdate({ Guild: channel.guildId }, { Message: m.id });
        } else {

            let embed2 = new EmbedBuilder().setColor("2f3136").setDescription(`[${track.title}](${track.uri}) - \`[ ${track.isStream ? '[**◉ LIVE**]' : convertTime(player.queue.current.length)} ]\``).setImage(icon).setFooter({ text: `Requested by ${player.queue.current.requester.tag}`, iconURL: player.queue.current.requester.displayAvatarURL({ dynamic: true }) });

            await message.edit({
                content: "__**Join a voice channel and queue songs by name/url.**__\n",
                embeds: [embed2]

            });
        };
    } catch (error) {
        return console.error(error);
    }
};
/**
 * 
 * @param {ButtonInteraction} int 
 * @param {String} args 
 * @param {Client} client 
 */

async function buttonReply(int, args, client) {

    if (int.replied) {
        await int.editReply({ embeds: [new EmbedBuilder().setColor("2f3136").setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    } else {
        await int.editReply({ embeds: [new EmbedBuilder().setColor("2f3136").setAuthor({ name: int.member.user.tag, iconURL: int.member.user.displayAvatarURL() }).setDescription(args)] })
    };

    setTimeout(async () => {
        if (int && !int.ephemeral) {
            await int.deleteReply().catch(() => { });
        };
    }, 2000);
};

module.exports = {
    playerhandler,
    trackStartEventHandler,
    buttonReply,
    oops,
    autoplay
}