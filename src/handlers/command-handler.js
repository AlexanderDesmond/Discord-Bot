const { readdirSync } = require("fs");
const asciiTable = require("ascii-table");

const table = new asciiTable().setHeading("Command", "Load Status");

module.exports = client => {
  // Load all the command files
  readdirSync("src/commands").forEach(dir => {
    const commands = readdirSync(`src/commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );

    // Go through every command file and add each command to the bot's commands collection.
    for (let file of commands) {
      let command = require(`../commands/${dir}/${file}`);

      // If a command exists add it to the commands collection and update the table; otherwise, just update the table.
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, "✅");
      } else {
        table.addRow(file, "🚫");
        continue;
      }

      // Add the aliases
      if (command.aliases && Array.isArray(command)) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
    }
  });

  console.log(table.toString());
};
