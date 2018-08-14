const config = {
  "headdeveloper": "262340466874384385",

  "developer": [],

  "trusted": [],

  "token": "",

  "bot_id" : "475645414599557140",

  "invite": "https://discordapp.com/api/oauth2/authorize?client_id=475645414599557140&permissions=190464&scope=bot",

  "patreon": "https://www.patreon.com/SpaceXAgent",

  "developer_server": "https://discord.gg/E7ngxkC",

  "bot_manual": "https://docs.google.com/document/d/1OEmXP_fCbFpgPgwRvf34pl42rG_vcnZw8B3KzKxAykc/edit?usp=sharing",

  "defaultSettings" : {

    "prefix": "++",
    "modLogChannel": "mod-log",
    "newsNotifyChannel": "spacex-news",

    "modRole": "Mod",
    "adminRole": "Admin",

    "modLogging": "false",
    "newsPosting": "false",

    "systemNotice": "true",
    //"newsNotify": "false",
    "modLoggNotify": "false",

    "utcOffset": "+00:00",
  },

    "bugChannel" : "448908658156503060",
    "sugChannel" : "448911008459784242",
    "supChannel" : "449210932816642068",

  permLevels: [
    { level: 0,
      name: "User",
      check: () => true
    },
    { level: 2,
      name: "Mod",

      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Admin",
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owner",
      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Trusted",

      check: (message) => config.trusted.includes(message.author.id)
    },

    { level: 9,
      name: "Developer",
      check: (message) => config.developer.includes(message.author.id)
    },

    { level: 10,
      name: "Head Developer", 

      check: (message) => message.client.config.headdeveloper === message.author.id
    }
  ]
};

module.exports = config;
