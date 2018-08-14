const Discord = require("discord.js");
const moment = require("moment");

//Gotta move API reading to SpaceX.js file

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

exports.run = async (client, message, args, level) => {

      request.open("GET", "https://api.spacexdata.com/v2/launches/latest", true);
      request.send();
      getElements = function(response) {
        var mission_name="";
        const embed = new Discord.RichEmbed(response)

        .setTitle("Latest Launch: ")
        .setColor(674463)
        .setThumbnail(response.links.mission_patch)
        .setFooter("© SpaceX Agent using SpaceX-API", client.user.avatarURL)
        .setTimestamp()

        for (var i = 0; i < response.rocket.second_stage.payloads.length; i++)
        mission_name += response.rocket.second_stage.payloads[i].payload_id + "/";
        mission_name = mission_name.slice(0,-1);
  
        embed
        .addField(mission_name,
        "Flight number: " + response.flight_number + "\n" + 
        "Launch date (UTC): " + moment.utc(response.launch_date_utc).format("YYYY MMMM Do, HH:MM:SS") + "\n")

        .addField("Launch Info: ",
        "Launch Success: " + response.launch_success + "\n" + 
        "Site: " + response.launch_site.site_name + "\n\n")
        
        .addField("Vehicle: ",
          response.rocket.rocket_name + " (" + response.rocket.rocket_type + ")" + "\n" +
        "Core: " + response.rocket.first_stage.cores[0].core_serial + "\n"+
        "Block: " + response.rocket.first_stage.cores[0].block + "\n" + 
        "Flight: " + response.rocket.first_stage.cores[0].flight + "\n" +
        "Land Success: " + response.rocket.first_stage.cores[0].land_success + 
        "\n"+ "Landing Type: " + response.rocket.first_stage.cores[0].landing_type + "\n" + 
        "Landing Vehicle: " + response.rocket.first_stage.cores[0].landing_vehicle + "\n\n")

      .addField("Payload: ",
        "Id: " + response.rocket.second_stage.payloads[0].payload_id + "\n"  + 
        "Type: " + response.rocket.second_stage.payloads[0].payload_type + "\n" + 
        "Mass: " + response.rocket.second_stage.payloads[0].payload_mass_kg + "kg"+ "\n" + 
        "Orbit: " + response.rocket.second_stage.payloads[0].orbit + "\n" + 
        "Customer: " + response.rocket.second_stage.payloads[0].customers + "\n\n")
    
      if (response.rocket.second_stage.payloads.length>1){
      embed
        .addField("Secondary Payload: ",
        "Id: " + response.rocket.second_stage.payloads[1].payload_id + "\n"  + 
        "Type: " + response.rocket.second_stage.payloads[1].payload_type + "\n" + 
        "Mass: " + response.rocket.second_stage.payloads[1].payload_mass_kg + "kg"+ "\n" + 
        "Orbit: " + response.rocket.second_stage.payloads[1].orbit + "\n" + 
        "Customer: " + response.rocket.second_stage.payloads[1].customers + "\n\n")
      }
      
      embed
      .addField("Mission Details: ",
        response.details + "\n\n")

        .addField("Media: ",
        `[**Webcast of Launch**](${response.links.video_link})` + " | " + 
        `[**Official presskit**](${response.links.presskit})`+ " | " + 
        `[**Reddit Campaign**](${response.links.reddit_campaign})`)
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
  name: "latest",
  category: "Launch/SpaceX",
  description: "Shows latest launch.",
  usage: "latest"
};