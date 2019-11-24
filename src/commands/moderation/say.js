const { RichEmbed } = require("discord.js");

module.exports = {
  name: "say",
  category: "moderation",
  description: "Say a word or phrase.",
  run: async (client, msg, args) => {
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
};
