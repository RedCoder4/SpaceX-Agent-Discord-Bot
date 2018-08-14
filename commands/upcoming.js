const Discord = require("discord.js");
const moment = require("moment");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let request = new XMLHttpRequest();
request.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    let response = JSON.parse(this.responseText);
    getElements(response);
  }
}

exports.run = async (client, message, args, level) => {


    request.open("GET", "https://api.spacexdata.com/v2/launches/upcoming", true);
    request.send();
    getElements = function(response) {
      var mission_name="";
      const embed = new Discord.RichEmbed(response)

      .setTitle("Closets Upcoming Launch: ")
      .setColor(674463)
      if (response[0].links.mission_patch != null){
        embed
        .setThumbnail(response[0].links.mission_patch)
      }
      embed
      .setFooter("© SpaceX Agent using SpaceX-API", client.user.avatarURL)
      .setTimestamp()

      for (var i = 0; i < response[0].rocket.second_stage.payloads.length; i++)
      mission_name += response[0].rocket.second_stage.payloads[i].payload_id + "/";
      mission_name = mission_name.slice(0,-1);  

      embed
      .addField(mission_name, 
      "Flight number: " + response[0].flight_number + "\n" +
      "Launch date (UTC): " + moment.utc(response[0].launch_date_utc).format("YYYY MMMM Do, HH:MM:SS") + "\n")

      .addField("Launch Info: ",
        "Site: " + response[0].launch_site.site_name + "\n" +

        "Vehicle: " + "\n" + 
        response[0].rocket.rocket_name + " (" + response[0].rocket.rocket_type + ")" + "\n" +
        "Core: " + response[0].rocket.first_stage.cores[0].core_serial + "\n"+
        "Block: " + response[0].rocket.first_stage.cores[0].block + "\n" + 
        "Flight: " + response[0].rocket.first_stage.cores[0].flight + "\n\n")
      
      
      .addField("Payload: ",
        "Id: " + response[0].rocket.second_stage.payloads[0].payload_id + "\n"  + 
        "Type: " + response[0].rocket.second_stage.payloads[0].payload_type + "\n" + 
        "Mass: " + response[0].rocket.second_stage.payloads[0].payload_mass_kg + "kg"+ "\n" + 
        "Orbit: " + response[0].rocket.second_stage.payloads[0].orbit + "\n" + 
        "Customer: " + response[0].rocket.second_stage.payloads[0].customers + "\n\n")
      
      if (response[0].rocket.second_stage.payloads.length>1){
        embed
        .addField("Secondary Payload: ",
        "Id: " + response[0].rocket.second_stage.payloads[1].payload_id + "\n"  + 
        "Type: " + response[0].rocket.second_stage.payloads[1].payload_type + "\n" + 
        "Mass: " + response[0].rocket.second_stage.payloads[1].payload_mass_kg + "kg"+ "\n" + 
        "Orbit: " + response[0].rocket.second_stage.payloads[1].orbit + "\n" + 
        "Customer: " + response[0].rocket.second_stage.payloads[1].customers + "\n\n")
      }
      embed
      .addField("Misison Details: ",
      response[0].details + "\n\n")

      .addField("Media: ",
        `[**Webcast of Launch**](${response[0].links.video_link})` + " | " + 
        `[**Official presskit**](${response[0].links.presskit})`+ " | " + 
        `[**Reddit Campaign**](${response[0].links.reddit_campaign})`)
      message.channel.send({embed});
    }
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "upcoming",
    category: "Launch/SpaceX",
    description: "Shows upcoming launch.",
    usage: "upcoming"
  };