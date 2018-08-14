const Discord = require("discord.js");
exports.run = async (client, message,args, level) => {
if(!args|| args < 1)return message.reply(`Please do ${message.settings.prefix}help support, to see how to use this command properly`);
let description = args.join(" ");
const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle("__SUPPORT__")
    .addField("User Name: " + message.author.tag, "User ID: " + message.author.id)
    .addField("Server Name: " + message.guild.name, "Server ID: " + message.guild.id)
    .addField("Description", description)
    .addField("Notifying", client.users.get(client.config.headdeveloper))

    const response = await client.awaitReply(message, `Are you sure you want to request for support? (y=yes, n=no , response time: 1 min)`);

    if (["y", "yes"].includes(response.toLowerCase())) {
        client.logger.report(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) Sent a request for support`);
        client.channels.get(client.config.supChannel).send({embed});
        message.reply("A support request message has been sent to the developer server!");
        
    }else

    if (["n","no","cancel"].includes(response)) {
        message.reply("Action cancelled.");
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sup"],
    permLevel: "Mod"
};
exports.help = {
    name: "support",
    category: "Help/Support",
    description: "Sends a message to developers requesting support!",
    usage: "support <description>"
};
