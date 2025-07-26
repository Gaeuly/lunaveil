const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require("discord.js");
const db = require("../../schema/setup");
const { KazagumoPlayer } = require("kazagumo")

module.exports = {
    name: "playerCreate",

    /**
	 * 
	 * @param {Client} client 
	 * @param {KazagumoPlayer} player 
	 */

    run: async (client, player) => {
        
        let name = client.guilds.cache.get(player.guildId).name;

        client.logger.log(`Player Create in ${name} [ ${player.guildId} ]`, "log");

        let guild = client.guilds.cache.get(player.guildId);
        if (!guild) return;
        
        const data = await db.findOne({ Guild: guild.id });
        if (!data) return;

        let channel = guild.channels.cache.get(data.Channel);
        if (!channel) return;

        let message;
        try {

            message = await channel.messages.fetch(data.Message, { cache: true });

        } catch (e) { };

        if (!message) return;
        const but1 = new ButtonBuilder().setCustomId(`${message.guildId}pause`).setEmoji(`⏸️`).setStyle('Secondary').setDisabled(false)
        const but2 = new ButtonBuilder().setCustomId(`${message.guildId}previous`).setEmoji(`⏮️`).setStyle('Secondary').setDisabled(false)
        const but3 = new ButtonBuilder().setCustomId(`${message.guildId}skip`).setEmoji(`⏭️`).setStyle('Secondary').setDisabled(false)
        const but4 = new ButtonBuilder().setCustomId(`${message.guildId}voldown`).setEmoji(`🔉`).setStyle('Secondary').setDisabled(false)
        const but5 = new ButtonBuilder().setCustomId(`${message.guildId}volup`).setEmoji(`🔊`).setStyle('Secondary').setDisabled(false)

        const row = new ActionRowBuilder().addComponents(but4, but2, but1, but3, but5)

        await message.edit({ content: "__**Join a voice channel and queue songs by name/url.**__\n\n", components: [row] }).catch(() => { });

    }
};