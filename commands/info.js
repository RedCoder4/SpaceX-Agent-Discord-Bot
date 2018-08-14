const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle('__SpaceX Agent Info:__')
    .addField('ID',`${client.config.bot_id}`)
    .addField('Prefix',`${message.settings.prefix} (${client.config.defaultSettings.prefix})`)
    .addField("Owner",`Indrit#1621`)
    .addField("OwnerID",`262340466874384385`)
    .addField("Library",`Discord.js`)
    .addField("API",`SpaceX-Agent API (not open for public yet)`)
    .addField('Links', `[**Bot Invite**](${client.config.invite})`+ 
    " | " + `[**Developer Server**](${client.config.developer_server})` + 
    " | " + `[**Patreon**](${client.config.patreon})` + 
    " | " + `[**User Manual**](${client.config.bot_manual})`)
    message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botinfo","bot"],
  permLevel: "User"
};

exports.help = {
  name: "info",
  category: "Miscelaneous",
  description: "Shows some useful info about the bot and it's owner",
  usage: "info"
};
