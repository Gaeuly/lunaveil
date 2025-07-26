	const { EmbedBuilder, Client, ButtonBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { trackStartEventHandler } = require("../../utils/functions");
const db = require("../../schema/setup");
const { KazagumoPlayer, KazagumoTrack } = require("kazagumo");
const lyricsfinder = require('lyrics-finder');
const moment = require(`moment`);
const { Classic } = require("musicard");
const fs = require("fs");
require(`moment-duration-format`);

module.exports = {
    name: "playerStart",
    /**
     * 
     * @param {Client} client 
     * @param {KazagumoPlayer} player 
     * @param {KazagumoTrack} track 
     */

    run: async (client, player, track) => {
        let url = track.uri;
        if (url.includes("youtube.com")) {
            url = "https://discord.gg/freecode";
        }

        let duration = moment.duration(player.queue.current.length).format("hh:mm:ss");
        if (duration < 30) {
            player.skip();
            const embed = new EmbedBuilder().setColor("#d5afae").setDescription(`I am skipping this track as its duration is less than 30 seconds`);
            const sahil = await client.channels.cache.get(player.textId)?.send({ embeds: [embed] });
        }

        let guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;

        let channel = guild.channels.cache.get(player.textId);
        if (!channel) return;

        let data = await db.findOne({ Guild: guild.id });

        if (data && data.Channel) {
            let textChannel = guild.channels.cache.get(data.Channel);
            const id = data.Message;
            if (channel === textChannel) {
                return await trackStartEventHandler(id, textChannel, player, track, client);
            } else {
                await trackStartEventHandler(id, textChannel, player, track, client);
            }
        }

        const emojiplay = client.emoji.play;

        try {
            const thumbnail = track.thumbnail || `https://img.spotify.com/track/${track.identifier}/hqdefault.jpg`;
            const progress = track.length > 0 ? (player.position / track.length) * 100 : 0;
            const endTime = moment.duration(track.length).format("mm:ss");


            const musicard = await Classic({
                thumbnailImage: thumbnail,
                backgroundColor: "#070707",
                progress: progress,
                progressColor: "#d5afae",
                progressBarColor: "#874845",
                name: track.title,
                nameColor: "#d5afae",
                endTime: endTime,
                author: `By ${track.author}`,
                authorColor: "#696969"
            });

            const filePath = `./musicard_${track.identifier}.png`;
            fs.writeFileSync(filePath, musicard);

            const thing = new EmbedBuilder()
                .setColor("#d5afae");

            const controlRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("pause")
                        .setEmoji("<:1340698422503674006:1342912682659151923>")
                        .setStyle("Secondary")
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("skip")
                        .setEmoji("<:1340692842183659651:1342912707229122651>")
                        .setStyle("Secondary")
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("loop")
                        .setEmoji("<:1340687726261047439:1343091704772821093>")
                        .setStyle("Secondary")
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("stop")
                        .setEmoji("<:1340696232682848398:1342912633669685368>")
                        .setStyle("Secondary")
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("shuffle")
                        .setEmoji("<:1340687759928463441:1342912642028671159>")
                        .setStyle("Success")
                );

            const filterRow = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("filters")
                    .setPlaceholder("Select a filter")
                    .addOptions([
                        {
                            label: "8D",
                            value: "8d",
                            description: "Apply the 8D audio effect.",
                        },
                        {
                            label: "Bass Boost",
                            value: "bass",
                            description: "Boost the bass of the track.",
                        },
                        {
                            label: "Nightcore",
                            value: "nightcore",
                            description: "Speed up and pitch up the track.",
                        },
                        {
                            label: "Vaporwave",
                            value: "vaporwave",
                            description: "Slow down and pitch down the track.",
                        },
                        {
                            label: "Reset Filters",
                            value: "reset",
                            description: "Reset all applied filters.",
                        },
                    ])
            );

            const nplaying = await client.channels.cache.get(player.textId)?.send({
                components: [filterRow, controlRow],
                files: [{
                    attachment: filePath,
                    name: `musicard_${track.identifier}.png`
                }]
            });

            const filter = (message) => {
                if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
                else {
                    message.reply({ content: `<:1338107634812977253:1342912739101904926> | You need to be in a same/voice channel to use this button.`, ephemeral: true });
                }
            };

            const collector = nplaying.createMessageComponentCollector({ filter, time: track.duration });

            collector.on('collect', async (message) => {
                const id = message.customId;

                if (id === "filters") {
                    const selectedFilter = message.values[0]; 
                    switch (selectedFilter) {
                        case "8d":
                            await player.shoukaku.setFilters({
                                op: 'filters',
                                guildId: message.guild.id,
                                rotation: { rotationHz: 0.2 },
                            });
                            message.reply({ content: "Applied **8D** filter.", ephemeral: true });
                            break;
                        case "bass":
                            await player.shoukaku.setFilters({
                                op: 'filters',
                                guildId: message.guild.id,
                                equalizer: [
                                    { band: 0, gain: 0.1 },
                                    { band: 1, gain: 0.1 },
                                    { band: 2, gain: 0.05 },
                                    { band: 3, gain: 0.05 },
                                    { band: 4, gain: -0.05 },
                                    { band: 5, gain: -0.05 },
                                    { band: 6, gain: 0 },
                                    { band: 7, gain: -0.05 },
                                    { band: 8, gain: -0.05 },
                                    { band: 9, gain: 0 },
                                    { band: 10, gain: 0.05 },
                                    { band: 11, gain: 0.05 },
                                    { band: 12, gain: 0.1 },
                                    { band: 13, gain: 0.1 },
                                ],
                            });
                            message.reply({ content: "Applied **Bass Boost** filter.", ephemeral: true });
                            break;
                        case "nightcore":
                            await player.shoukaku.setFilters({
                                op: 'filters',
                                guildId: message.guild.id,
                                timescale: { speed: 1.2, pitch: 1.2, rate: 1.2 },
                            });
                            message.reply({ content: "Applied **Nightcore** filter.", ephemeral: true });
                            break;
                        case "vaporwave":
                            await player.shoukaku.setFilters({
                                op: 'filters',
                                guildId: message.guild.id,
                                timescale: { speed: 0.8, pitch: 0.8, rate: 0.8 },
                            });
                            message.reply({ content: "Applied **Vaporwave** filter.", ephemeral: true });
                            break;
                        case "reset":
                            await player.shoukaku.setFilters({
                                op: 'filters',
                                guildId: message.guild.id,
                            });
                            message.reply({ content: "Reset all filters.", ephemeral: true });
                            break;
                    }
                }

                else if (id === "pause") {
                    if (!player) {
                        collector.stop();
                    }
                    player.pause(true);
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: '| Song Has Been Paused', iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    await nplaying.edit({ components: [controlRow, filterRow] });
                    message.reply({ embeds: [embed], ephemeral: true });
                } else if (id === "resume") {
                    if (!player) {
                        collector.stop();
                    }
                    player.pause(false);
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: '| Song Has Been Resumed', iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    await nplaying.edit({ components: [controlRow, filterRow] });
                    message.reply({ embeds: [embed], ephemeral: true });
                } else if (id === "skip") {
                    if (!player) {
                        collector.stop();
                    }
                    player.skip();
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: '| Song Has Been Skipped', iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    message.reply({ embeds: [embed], ephemeral: true });
                } else if (id === "stop") {
                    if (!player) {
                        collector.stop();
                    }
                    player.queue.clear();
                    player.data.delete("autoplay")
                    player.loop = 'none';
                    player.playing = false;
                    player.paused = false;
                    await player.skip();
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: '| Song Has Been Stopped', iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    await nplaying.edit({ components: [] });
                    message.reply({ embeds: [embed], ephemeral: true });
                } else if (id === "shuffle") {
                    if (!player) {
                        collector.stop();
                    }
                    player.queue.shuffle();
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: '| Successfully shuffled', iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    message.reply({ embeds: [embed], ephemeral: true });
                } else if (id === "loop") {
                    if (!player) {
                        collector.stop();
                    }
                    player.setLoop('queue');
                    player.setLoop('track');
                    const Text = player.Loop
                        ? `Enable`
                        : `Disabled`;
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `| Loop track is now ${Text}`, iconURL: client.user.displayAvatarURL() })
                        .setColor("d5afae");
                    message.reply({ embeds: [embed], ephemeral: true });
                }
            });

            fs.unlinkSync(filePath);
        } catch (error) {
            console.error("Error generating music card:", error);
        }
    }
};