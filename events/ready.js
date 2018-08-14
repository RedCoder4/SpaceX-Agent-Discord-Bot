const config = require("../config.js");

module.exports = async (client) => {
  // Log that the bot is online.
  client.logger.log(`[READY] ${client.user.tag}, ready to serve ${client.users.size} users on ${client.channels.size} channels in ${client.guilds.size} servers.`, "ready");
  client.user.setActivity(config.defaultSettings.prefix +`help`, {type: "Watching"});

};
