const Discord = require("discord.js");
const moment = require("moment");

const BCSLF = "25.9973304,-97.1572398";
const BCLCC = "25.9879626,-97.187042";
const BCV = "25.9921457,-97.1826186";

exports.run = (client, message, [action, name], level) => {

    const embed = new Discord.RichEmbed()
    .setColor(674463)
    .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
    .setTimestamp()
    .setTitle("__SATELLITE VIEW:__")

    const settings = message.settings;
    if(!action)return message.reply("Please specify what type of sub-command you wanna use, <view/list>");
    if(action === "view"){
        if(!name)return message.reply("Please specify the area you wanna view, use list to see available views");
        if(name === "BCSLF" || name === "Boca Chica Space Launch Facility"){
            var time = new Date();
            client.utcOffsetRequest(time);
            embed
            .addField("SpaceX's Boca Chica Space Launch Facility: ","At (UTC) " + n + " on google maps")
            .setImage(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${BCSLF}&zoom=17&size=700x450&type=satellite`)
            message.channel.send({embed});
        }
        if(name === "BCLCC" || name === "Boca Chica Launch Control Complex"){
            var d = new Date();
            var n = d.toUTCString();
            embed
            .addField("SpaceX's Boca Chica Launch Control Complex: ","At (UTC) " + n + " on google maps")
            .setImage(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${BCLCC}&zoom=17&size=700x450&type=satellite`)
            message.channel.send({embed});
        }
        if(name === "BCV" || name === "Boca Chica Village"){
            var d = new Date();
            var n = d.toUTCString();
            embed
            .addField("Boca Chica Village: ","At (UTC) " + n + " on google maps")
            .setImage(`https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center=${BCV}&zoom=17&size=700x450&type=satellite`)
            message.channel.send({embed});
        }
    }
    if(action === "list"){
        const embed = new Discord.RichEmbed()
        .setColor(674463)
        .setFooter("© SpaceX Agent using SpaceXAgent-API", client.user.avatarURL)
        .setTimestamp()
        .addField("SpaceX's Facilites: "," Boca Chica Space Launch Facility (BCSLF)" + "\n"+
        "Boca Chica Launch Control Complex (BCLCC)" + "\n" +
        "Boca Chica Village (BCV)")
        message.channel.send({embed});
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sat"],
    permLevel: "User"
};
exports.help = {
    name: "satellite",
    category: "Launch/SpaceX",
    description: "Shows the latest images on specific SpaceX Facilities (Boca Chica)",
    usage: "satellite <view/compare/list> <name>"
};
