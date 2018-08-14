const Discord = require("discord.js");
exports.run = async (client, message,args, level) => {
if(!args || args < 1)return message.reply(`Please do ${message.settings.prefix}help report, to see how to use this command properly`);
let description = args.join(" ");
const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle("__PROBLEM REPORT__")
    .addField("User Name: " + message.author.tag, "User ID: " + message.author.id)
    .addField("Description", description)
    .addField("Notifying", client.users.get(client.config.headdeveloper))
    //client.users.get(client.config.headdeveloper).send({embed});
    const response = await client.awaitReply(message, `Are you sure you want to request for support? (y=yes, n=no , response time: 1 min)`);

    if (["y", "yes"].includes(response.toLowerCase())) {
        client.logger.report(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) Sent a report message!`);
        client.channels.get(client.config.bugChannel).send({embed});
        message.reply("A report has been sent to the developer server!");

    }else

    if (["n","no","cancel"].includes(response)) {
        message.reply("Action cancelled.");
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["bug","problem"],
    permLevel: "User"
};
exports.help = {
    name: "report",
    category: "Help/Support",
    description: "Sends a report message about your problem to the developers! (DO NOT ABUSE THIS COMMAND)",
    usage: "report <problem/bug>"
};
