const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { Kazagumo, Plugins } = require("kazagumo");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const shoukakuOptions = require("../utils/options");
const { Connectors } = require("shoukaku");
const Spotify = require("kazagumo-spotify");

const k = "OK | ";

class MusicBot extends Client {
  constructor() {
    super({
      shards: "auto",
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
      ]
    });

    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.config = require("../config.js");
    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.embedColor = this.config.embedColor;
    this.aliases = new Collection();
    this.logger = require("../utils/logger.js");
    this.emoji = require("../utils/emoji.json");
    if (!this.token) this.token = this.config.token;
    this.manager;

    this._connectMongodb();
  }

  _loadPlayer() {
    this.manager = new Kazagumo({
      plugins: [
        new Spotify({
          clientId: this.config.SpotifyID,
          clientSecret: this.config.SpotifySecret,
          playlistPageLimit: 3,
          albumPageLimit: 4,
          searchLimit: 10,
          searchMarket: "IN"
        }),
        new Plugins.PlayerMoved(this)
      ],
      defaultSearchEngine: "youtube",
      send: (guildId, payload) => {
        const guild = this.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
      }
    }, new Connectors.DiscordJS(this), this.config.nodes, shoukakuOptions);

    return this.Kazagumo;
  }

  _loadClientEvents() {
    readdirSync("./src/events/Client").forEach(file => {
      const event = require(`../events/Client/${file}`);
      const eventName = file.split(".")[0];
      this.logger.log(`Loading Events Client ${eventName}`, "event");
      this.on(event.name, (...args) => event.run(this, ...args));
    });
  }

  _loadNodeEvents() {
    readdirSync("./src/events/Node").forEach(file => {
      const event = require(`../events/Node/${file}`);
      const eventName = file.split(".")[0];
      this.logger.log(`Loading Events Lavalink ${eventName}`, "event");
      this.manager.shoukaku.on(event.name, (...args) => event.run(this, ...args));
    });
  }

  _loadPlayerEvents() {
    readdirSync("./src/events/Players").forEach(file => {
      const event = require(`../events/Players/${file}`);
      const eventName = file.split(".")[0];
      this.logger.log(`Loading Events Players ${eventName}`, "event");
      this.manager.on(event.name, (...args) => event.run(this, ...args));
    });
  }

  _loadCommands() {
    readdirSync("./src/commands").forEach(dir => {
      const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        this.logger.log(`[ • ] Message Command Loaded: ${command.category} - ${command.name}`, "cmd");
        this.commands.set(command.name, command);
      }
    });
  }

  _loadSlashCommands() {
    const data = [];
    readdirSync("./src/slashCommands").forEach((dir) => {
      const slashCommandFile = readdirSync(`./src/slashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

      for (const file of slashCommandFile) {
        const slashCommand = require(`../slashCommands/${dir}/${file}`);

        if (!slashCommand.name) return console.error(`slashCommandNameError: ${file} name is required.`);
        if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${file} description is required.`);

        this.slashCommands.set(slashCommand.name, slashCommand);
        this.logger.log(`[ / ] Slash Command Loaded: ${slashCommand.name}`, "cmd");
        data.push(slashCommand);
      }
    });

    this.on("ready", async () => {
      await this.application.commands.set(data)
        .then(() => this.logger.log(`Successfully Loaded All Slash Commands`, "cmd"))
        .catch((e) => console.log(k, e));
    });
  }

  async _connectMongodb() {
  const dbOptions = {
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4
  };
    mongoose.set('strictQuery', true);
    mongoose.connect(this.config.mongourl, dbOptions);
    mongoose.Promise = global.Promise;
    mongoose.connection.on("connected", () => {
      this.logger.log("[DB] DATABASE CONNECTED", "ready");
    });
    mongoose.connection.on("err", (err) => {
      this.logger.log(`[DB]Mongoose connection error: \n ${err.stack}`, "error");
    });
    mongoose.connection.on("disconnected", () => {
      this.logger.log("[DB]Mongoose disconnected", "error");
    });
  }

  connect() {
    return super.login(this.token);
  }
}

module.exports = MusicBot;