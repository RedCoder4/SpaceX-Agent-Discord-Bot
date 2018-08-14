exports.run = async (client, message, args, level) => {
  await message.reply("Bot is restarting.");
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(-1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reboot"],
  permLevel: "Developer"
};

exports.help = {
  name: "restart",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "restart"
};
