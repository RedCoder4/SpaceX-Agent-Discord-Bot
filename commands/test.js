exports.run = (client, message, args) => {
  const moment = require("moment");
  const settings = message.settings;
  
      message.channel.send("t!rep kev");
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Developer"
  };
  
  exports.help = {
    name: "test",
    category: "System",
    description: "Test",
    usage: "test"
  };