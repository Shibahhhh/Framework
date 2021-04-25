module.exports = async (client) => {
  const activities = [{ name: "your commands", type: "LISTENING" }];

  // Update presence
  client.user.setPresence({ status: "online", activity: activities[0] });

  let activity = 1;

  // Update activity every 30 seconds
  setInterval(() => {
    activities[1] = {
      name: `${client.guilds.cache.size} servers`,
      type: "WATCHING",
    }; // Update server count
    activities[2] = {
      name: `${client.users.cache.size} users`,
      type: "WATCHING",
    }; // Update user count
    if (activity > 2) activity = 0;
    client.user.setActivity(activities[activity]);
    activity++;
  }, 30000);

  client.logger.info("Updating bot...");
  client.logger.info("Bot is now online");
  client.logger.info(`Bot is running on ${client.guilds.cache.size} server(s)`);
};
