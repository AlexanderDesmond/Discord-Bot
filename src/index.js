// Get Discord bot token
require("dotenv/config");
const TOKEN = process.env.DISCORD_TOKEN;
// Set up bot
const Discord = require("discord.js");
const client = new Discord.Client();

// Turn bot on
client.on("ready", () => {
  console.log("Bot connected.");
});

// Sign bot in
client.login(TOKEN);
