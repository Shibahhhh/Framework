const { MessageEmbed } = require("discord.js");
const { oneLine } = require("common-tags");
const config = require("../../config.json");

module.exports = async (client, message) => {
  if (
    message.channel.type === "dm" ||
    !message.channel.viewable ||
    message.author.bot
  )
    return;

  // Command handler
  const prefix = config.prefix;
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${prefix.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    )})\\s*`
  );

  if (prefixRegex.test(message.content)) {
    const [, match] = message.content.match(prefixRegex);
    const args = message.content.slice(match.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    let command = client.commands.get(cmd) || client.aliases.get(cmd); // If command not found, check aliases
    if (command) {
      // Check permissions
      const permission = command.checkPermissions(message);
      if (permission) {
        return command.run(message, args); // Run command
      }
    } else if (
      (message.content === `<@${client.user.id}>` ||
        message.content === `<@!${client.user.id}>`) &&
      message.channel
        .permissionsFor(message.guild.me)
        .has(["SEND_MESSAGES", "EMBED_LINKS"]) &&
      message.channel.id
    ) {
      const embed = new MessageEmbed()
        .setTitle("Hello!")
        .setDescription(`Use \`${prefix}help\` to get started.`)
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    }
  }
};
