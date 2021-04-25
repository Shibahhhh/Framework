const Command = require("../Command.js");

module.exports = class TestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      aliases: ["testing123"],
      usage: "test",
      description: "test",
      type: client.types.TEST,
      examples: ["test"],
    });
  }
  run(message) {
    message.channel.send('test')
  }
};
