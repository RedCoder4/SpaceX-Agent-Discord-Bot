const Discord = require("discord.js");

module.exports = (client, message) => {
  const embed = new Discord.RichEmbed();
 
  if (message.author.bot) return;

  const settings = message.settings = client.getGuildSettings(message.guild);

  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const level = client.permlevel(message);

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd){
    if (settings.systemNotice === "true") {
      embed
      .setColor(674463)
      .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
      .setTimestamp()
      .addField("Not a valid command!",`Please use ${message.settings.prefix}help to see the available commands!`)
      return message.channel.send({embed});
    }
    else{
      return;
    }

  }
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");

    if (level < client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        const embed = new Discord.RichEmbed()
        .setColor(674463)
        .setFooter("© SpaceX Agent using SpaceX-API", client.user.avatarURL)
        .setTimestamp()
        .addField(`Lack of Permission: `,`Derp... You do not have permission to use '${command}' ! `)
        return message.channel.send({embed});
      } else {
        return;
      }
    }

  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  client.logger.cmd(`[CMD]  ${message.author.username} (${message.author.id}) ${client.config.permLevels.find(l => l.level === level).name} ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};