exports.run = (client, message, args, level) => {
  if (!args[0]) {
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`;
    output += `[Use ${message.settings.prefix}help in a server channel, to also see the "Server only commands"]\n`;
    output += `[BE SURE TO CHECK OUT "User Manual" in ${message.settings.prefix}info as a server owner]\n`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.author.send(output, {code: "ascii", split: { char: "\u200b" }});

}  else {
  // Show individual command's help.
  let command = args[0];
  if (client.commands.has(command)) {
    command = client.commands.get(command);
    if (level < client.levelCache[command.conf.permLevel]) return;
    message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}`, {code:"ascii"});
  }
}
};

exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["h", "halp"],
permLevel: "User"
};

exports.help = {
name: "help",
category: "Help/Support",
description: "Displays all the available commands for your permission level.",
usage: "help [command]"
};
