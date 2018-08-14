const { inspect } = require("util");
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars
  const settings = message.settings;
  const overrides = client.settings.get(message.guild.id);
  
  if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (value.length < 1) return message.reply("Please specify a new value");
    if (value.join(" ") === settings[key]) return message.reply("This setting already has that value!");
    if (!client.settings.has(message.guild.id)) client.settings.set(message.guild.id, {});
    client.settings.setProp(message.guild.id, key, value.join(" "));

    if(settings.modLogging === "true"){
      if (settings.modLoggNotify === "true"){
        message.guild.channels.find("name", settings.modLogChannel).send(`@everyone Key ${key} successfully edited to ${value.join(" ")}`);
      }
      else{
        message.guild.channels.find("name", settings.modLogChannel).send(`Key ${key} successfully edited to ${value.join(" ")}`);
      }
    }
    message.reply(`Key ${key} successfully edited to ${value.join(" ")}`);
  } else
  
  // Resets a key to the default value
  if (action === "reset") {
    if (!key) return message.reply("Please specify a key to reset.");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    if (!overrides[key]) return message.reply("This key does not have an override and is already using defaults.");
    
    // Good demonstration of the custom awaitReply method in `./modules/functions.js` !
    const response = await client.awaitReply(message, `Are you sure you want to reset the Key ${key} to the default value? (y=yes, n=no , response time: 1 min)`);

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response.toLowerCase())) {
      // We delete the `key` here.
      delete overrides[key];
      client.settings.set(message.guild.id, overrides);
    if(settings.modLogging === "true"){
      if (settings.modLoggNotify === "true"){
        message.guild.channels.find("name", settings.modLogChannel).send(`@everyone Key${key} was successfully reset`);
      }
      else{
        message.guild.channels.find("name", settings.modLogChannel).send(`Key ${key} was successfully reset`);
      }
    }
      message.reply(`Key ${key} was successfully reset.`);
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {
      message.reply("Action cancelled.");
    }
  } else
  
  if (action === "get") {
    if (!key) return message.reply("Please specify a key or server to view");
    if (!settings[key]) return message.reply("This key does not exist in the settings");
    const isDefault = !overrides[key] ? "\nThis is the default global default value." : "";
    message.reply(`The value of ${key} is currently ${settings[key]}${isDefault}`);
  } else {
    message.channel.send(`\`\`\`Current Server Settings: \`\`\``);
    message.channel.send(inspect(settings), {code: "ascii"});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["set", "setting", "conf", "config"],
  permLevel: "Admin"
};

exports.help = {
  name: "settings",
  category: "System",
  description: "View or change settings for your server.",
  usage: "settings <get/edit/reset> <key> <value>"
};
