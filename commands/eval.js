const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle('JavaScript Eval:')
    .addField(':inbox_tray: INPUT',`\`\`\`\n${code}\n\`\`\``)
    if (evaled.length <= 1000) {
      embed
      .addField(':outbox_tray: OUTPUT',`\`\`\`${clean}\`\`\``)
    }
    else{
      embed
      .addField(':outbox_tray: OUTPUT',`\`\`\`FAILED TO PRINT OUT EVALED CODE! \nReason: Output TO LONG... \nCheck Console for EVAL OUPUT!\`\`\``)
      console.log(clean);
    }
    message.channel.send({embed});

  } catch (err) {
    message.channel.send(`\`\`\`\n ERROR: Invalid EVAL INPUT | See more info in console!\n\`\`\``);
    client.logger.error(`Failed to evaluate ${code}!`);
    client.logger.error(`ERROR MESSAGE:`);
    console.log(client.clean(client, err));
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Head Developer"
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
