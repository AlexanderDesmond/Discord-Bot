module.exports = {
  name: "ping",
  category: "info",
  description: "Returns the latency.",
  run: async (client, msg, args) => {
    const botMsg = await msg.channel.send("Pinging...");
    botMsg.edit(
      `Pong!\n Latency is ${Math.floor(
        botMsg.createdAt - msg.createdAt
      )}ms\nAPI Latency ${Math.round(client.ping)}ms`
    );
  }
};
