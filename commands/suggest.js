const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
if(!args|| args < 1)return message.reply(`Please do ${message.settings.prefix}help suggest, to see how to use this command properly`);
let description = args.join(" ");
const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle("__SUGGESTION__")
    .addField("User Name: " + message.author.tag, "User ID: " + message.author.id)
    .addField("Description", description)
    .addField("Notifying", client.users.get(client.config.headdeveloper))
    //client.users.get(client.config.headdeveloper).send({embed});
    const response = await client.awaitReply(message, `Are you sure you want to request for support? (y=yes, n=no , response time: 1 min)`);

    if (["y", "yes"].includes(response.toLowerCase())) {
        client.logger.report(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) Sent a suggestion!`);
        client.channels.get(client.config.sugChannel).send({embed});
        message.reply("A suggestion has been sent to the developer server!");

    }else

    if (["n","no","cancel"].includes(response)) {
        message.reply("Action cancelled.");
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["suggestion","idea","sug"],
    permLevel: "User"
};
exports.help = {
    name: "suggest",
    category: "Help/Support",
    description: "Sends a suggestion about the bot to the developers!",
    usage: "suggest <suggestion>"
};
