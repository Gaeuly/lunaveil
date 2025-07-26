const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    var invite = client.config.links.invite;
    var support = client.config.links.support;
    var topgg = client.config.links.topgg;
    var nutz = client.config.links.nutz

  let categories = [];
        let cots = [];

        if (!args[0]) {

           let helpmenu = new EmbedBuilder()
           .setAuthor({name : `${client.user.username} Help Panel` , iconURL : client.user.displayAvatarURL()})
           .setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
         .setDescription(`> <:1340698435124330507:1342912687620886678> Elevate your Discord experience with **Mishi**\n> <:1338107031617536081:1342912751944863776> Choose a specific category from drop-down below\n# **Categories**\n> <:1338107616672485427:1342912742549356615> **Information**\n> <:1340692868167372882:1342912715915526275> **Music**\n> <:1340687660573790249:1342912673037291611>  **Playlist**\n> <:1340698369743392859:1342912667374981222> **Filters**\n> <:1340696244573700278:1342912644851564575>  **Settings**\n
**<a:mishidot:1342882756840915055> [Invite Me](https://discord.com/oauth2/authorize?client_id=1297163853733433366)** <a:mishidot:1342882756840915055> **[Support Server](https://discord.gg/hdCzYfhrk8)**`)
        .setColor("#2f3136")
        .setFooter({
            text: `Made with 💞 by Mishi devs`,
            iconURL: "https://media.discordapp.net/attachments/1342899703615852697/1343542785860440114/cute-anime-girl-with-transparent-glasses-vector-39706529.jpg",
          })

            const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('helpop')
                    .setPlaceholder('Click Me!')
                    .addOptions([
                    {
                        label : `Home`,
                        //description: 'Get Home Page',
                        emoji : `<:1340696112176168960:1342912664199761940> `,
                        value : `h1`,
                    },
                    {
                        label: 'Information',
                        //description: 'Get All Information Command List',
                        value: 'h2',
                        emoji: '<:1338107616672485427:1342912742549356615> ',
                    },
                    {
                        label: 'Music',
                        //description: 'Get All Music Command List',
                        value: 'h3',
                        emoji: '<:1340692868167372882:1342912715915526275> ',
                    },
                    {
                        label: 'Playlist',
                        //description: 'Get All Playlist Command List',
                        value: 'h4',
                        emoji: '<:1340687660573790249:1342912673037291611>  ', 
                    },
                    {
                        label: 'Filters',
                        //description: 'Get All Filters Command List',
                        value: 'h5',
                        emoji: '<:1340698369743392859:1342912667374981222> ', 
                    },
                    {
                        label: 'Settings',
                        //description: 'Get All Settings Command List',
                        value: 'h6',
                        emoji: '<:1340696244573700278:1342912644851564575> ',
                    }
                ])
            )

        const msg = await message.channel.send({embeds: [helpmenu], components: [row]});
        let page = 0;
        let _commands;

         let embed1 = new EmbedBuilder().setColor("#2f3136").setDescription(`\`help\`, \`invite\`, \`ping\`, \`profile\`, \`stats\`, \`about\`. \`support\`, \`uptime\``).setAuthor({name : `| Information Commands` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed2 = new EmbedBuilder().setColor("#2f3136").setDescription(`\`autoplay\`, \`clear\`, \`join\`, \`leave\`, \`loop\`, \`pause\`, \`play\`, \`queue\`, \`resume\`, \`remove\`, \`shuffle\`, \`skip\`, \`stop\`, \`volume\``).setAuthor({name : `| Music Commands` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed3 = new EmbedBuilder().setColor("#2f3136").setDescription(`\`create\`, \`delete\`, \`info\`, \`list\`, \`load\`, \`removetrack\`, \`savecurrent\`, \`savequeue\``).setAuthor({name : `| Playlist Commands` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed4 = new EmbedBuilder().setColor("#2f3136").setDescription(`\`8d\`, \`bass\`, \`equalizer\`, \`nightcore\`, \`reset\`, \`speed\`, \`treblebass\`, \`vaporwave\``).setAuthor({name : `| Filters Commands` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        let embed5 = new EmbedBuilder().setColor("#2f3136").setDescription(`\`247\`, \`adddj\`, \`removedj\`, \`toggledj\``).setAuthor({name : `| Settings Commands` , iconURL : client.user.displayAvatarURL()}).setThumbnail(client.user.displayAvatarURL( {dynamic : true }))
        var embeds = [];
        embeds.push(embed1);embeds.push(embed2);embeds.push(embed3);embeds.push(embed4);embeds.push(embed5);

        const collector = await msg.createMessageComponentCollector({
            filter :(interaction) => {
                if(message.author.id === interaction.user.id) return true;
                else{
                    interaction.reply({content : `<:1338107634812977253:1342912739101904926> | That's not your session run : \`${prefix}help\` to create your own.` , ephemeral : true})
                }
            },
            time : 1000000,
            idle : 1000000/2
        });

        collector.on('collect',async(interaction) => {
            if(interaction.isSelectMenu())
            {
                for(const value of interaction.values)
                {
                    if(value === `h1`)
                    {
                        return interaction.update({embeds : [helpmenu]});
                    }
                    if(value === `h2`)
                    {
                        return interaction.update({embeds : [embed1]});
                    }
                    if(value === `h3`)
                    {
                        return interaction.update({embeds : [embed2]});
                    }
                    if(value === `h4`)
                    {
                        return interaction.update({embeds : [embed3]});
                    }
                    if(value === `h5`)
                    {
                        return interaction.update({embeds : [embed4]});
                    }
                    if(value === `h6`)
                    {
                        return interaction.update({embeds : [embed5]})
                    }
                }
            }
            
        });
        collector.on('end',async() => {
            msg.edit({embeds : [helpmenu] , components : [] , content : `Help Query Got Timed Out!`})
        })

        }

  },
};