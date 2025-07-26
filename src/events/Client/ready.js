const { prefix } = require("../../config.js");
const { ActivityType } = require("discord.js");

module.exports ={
name: "ready",
run: async (client) => {
    client.logger.log(`${client.user.username} online!`, "ready");
    client.logger.log(`Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`, "ready");

    let statuses = [`${prefix}play`, `${prefix}help`];
    setInterval(function() {
  	let status = statuses[Math.floor(Math.random()*statuses.length)];
        client.user.setPresence({
            activities: [
                {
                    name: status,
                    type: ActivityType.Listening
                }
            ],
            status: "idle"
        });
    }, 10000)
 }
};