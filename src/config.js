require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'MTM0MzU4MjAxNzY1MjI2MDk0NQ.GLc-RX.xOrm2e2VnAINlrRYys74_Gqu3kHulB-82AHjgY', // your discord bot token
  prefix: process.env.PREFIX || '?', // bot prefix
  ownerID: process.env.OWNERID?.split(',') || ['500293365494054932'],
  SpotifyID: process.env.SPOTIFYID || 'bf5ee2a72bae40ffadc71a47280e5ff9', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '053469ffeb3844079fab734ebf3090c2', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://adityapriyandi03:root234@cluster0.48hg8m5.mongodb.net/?retryWrites=true&w=majority', // MongoDb URL
  embedColor: process.env.COlOR || '#E6E6FA', // embed colour
  logs: process.env.LOGS || '1398064461885079592', // Discord channel id 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/FnEe7xcYZQ',
    invite: process.env.INVITE || 'https://discord.gg/FnEe7xcYZQ',
    vote: process.env.VOTE || 'https://discord.gg/FnEe7xcYZQ',
    bg: process.env.BG || 'https://i.imgur.com/xrZaSG8.jpeg',
    arisa: process.env.arisa || 'https://discord.gg/FnEe7xcYZQ'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lava-v3.ajieblogs.eu.org:80',
      name: process.env.NODE_NAME || 'Okay',
      auth: process.env.NODE_AUTH || 'https://dsc.gg/ajidevserver',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
