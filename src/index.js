// Get Discord bot token
require("dotenv/config");
const TOKEN = process.env.DISCORD_TOKEN;
// Set up bot
const { Client, Collection } = require("discord.js");

// Create new bot.
const client = new Client();

// Create collections for the commands and aliases
client.commands = new Collection();
client.aliases = new Collection();

// Load the handlers (just the command handler here as it is the only one currently)
["command-handler"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

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
client.on("message", async msg => {
  const prefix = "!";

  if (msg.author.bot) return; // Ignore messages from bots.
  if (!msg.guild) return; // Ensure messages come from the server.
  if (!msg.content.startsWith(prefix)) return; // Ensure the message starts with the prefix
  if (!msg.member) msg.member = await msg.guild.fetchMember(msg); // Ensure the message comes from a member of the server.

  // Remove the prefix and transform the message into an array of strings for each word.
  const args = msg.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  // Remove the first element of the away and decapitalise it.
  const cmd = args.shift().toLocaleLowerCase();

  if (cmd.length === 0) return; // Ensure the command is not empty.

  // Get the command
  let command = client.commands.get(cmd);
  // If the command can't be found check the aliases
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  // Run the command
  if (command) command.run(client, msg, args);

  // Have bot give the latency.
  /*
  if (cmd === "ping") {
    const botMsg = await msg.channel.send("Pinging...");
    botMsg.edit(
      `Pong!\n Latency is ${Math.floor(
        botMsg.createdAt - msg.createdAt
      )}ms\nAPI Latency ${Math.round(client.ping)}ms`
    );
  }
  */

  // Have bot repeat a word or phrase.
  /*
  if (cmd === "say") {
    // Delete the users's message.
    if (msg.deletable) msg.delete();

    // If there is no message after the command.
    if (args.length < 1)
      return msg.reply("Nothing to say!").then(m => m.delete(5000));

    // Set the colour of an embed to match the bots's colour in the server
    const roleColour =
      msg.guild.me.displayHexColor === "#000000"
        ? "#FFFFFF"
        : msg.guild.me.displayHexColor;

    // Have the bot repeat a word or phrase (embedding is optional).
    if (args[0].toLocaleLowerCase() === "embed") {
      const embed = new RichEmbed()
        .setColor(roleColour)
        .setDescription(args.slice(1).join(" "))
        .setTimestamp()
        .setAuthor(msg.author.username, msg.author.displayAvatarURL);
      msg.channel.send(embed);
    } else {
      msg.channel.send(args.join(" "));
    }
  }
  */
});
