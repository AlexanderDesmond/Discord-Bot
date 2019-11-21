// Get Discord bot token
require("dotenv/config");
const TOKEN = process.env.DISCORD_TOKEN;
// Set up bot
const Discord = require("discord.js");
const client = new Discord.Client();

// Turn bot on
client.on("ready", () => {
  console.log("Bot connected.");

  client.channels
    .find(channel => channel.name === "discord-bot")
    .send("Hello! I'm a bot!");
});

// Sign bot in
client.login(TOKEN);

// Have bot respond to messages
client.on("message", msg => {
  if (
    msg.content.toLocaleLowerCase() === "hello" ||
    msg.content.toLocaleLowerCase() === "hi"
  ) {
    msg.channel.send(`Hi ${msg.author}!`);
  }
});
