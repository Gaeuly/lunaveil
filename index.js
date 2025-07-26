const mongoose = require('mongoose');
const { Database } = require("quickmongo");
const MusicBot = require("./src/structures/MusicClient");

const client = new MusicBot();
module.exports = client;

// Setup async agar urutan benar
(async () => {
  await client._loadPlayer();
  await client._loadClientEvents();
  await client._loadNodeEvents();
  await client._loadPlayerEvents();
  await client._loadCommands();
  await client._loadSlashCommands();
  await client.connect();
})();

// Global error handler
process.on('unhandledRejection', (reason, p) => {
  // Optional: log error if needed
});

process.on('uncaughtException', (err, origin) => {
  // Optional: log error if needed
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
  // Optional: log error if needed
});

process.on('multipleResolves', (type, promise, reason) => {
  // Optional: log error if needed
});

// Connect quickmongo database
client.db = new Database(client.config.mongourl);
client.db.connect();