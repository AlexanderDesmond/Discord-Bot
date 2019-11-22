// Get Discord bot token
require("dotenv/config");
const TOKEN = process.env.DISCORD_TOKEN;
// Set up bot
const Discord = require("discord.js");
const client = new Discord.Client();

// Sign bot in
client.login(TOKEN);

// Turn bot on
client.on("ready", () => {
  console.log(`${client.user.username} is online.`);

  client.channels
    .find(channel => channel.name === "discord-bot")
    .send("Hello! I'm a bot!");
});

// Have bot respond to messages
client.on("message", msg => {
  if (
    msg.content.toLocaleLowerCase() === "hello" ||
    msg.content.toLocaleLowerCase() === "hi"
  ) {
    msg.channel.send(`Hi ${msg.author}!`);
  }
});
