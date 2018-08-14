const moment = require("moment");
const Discord = require("discord.js");
const { version } = require("discord.js");
require("moment-duration-format");

exports.run = (client, message, args, level) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embed = new Discord.RichEmbed()
  .setColor(674463)
  .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
  .setTimestamp()
  .addField("__STATISTICS:__",
"• Mem Usage  ::  "+ (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + "MB" + "\n\n" +
"• Uptime     ::  " + duration + "\n\n" +
"• Users      ::  " + client.users.size.toLocaleString() + "\n\n" +
"• Servers    ::  " + client.guilds.size.toLocaleString() + "\n\n" +
"• Channels   ::  " + client.channels.size.toLocaleString() + "\n\n" +
"• Discord.js ::  " + version + "\n\n" +
"• Node       ::  " + process.version)
message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
