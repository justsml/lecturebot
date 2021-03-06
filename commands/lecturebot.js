const subscription = require("../subscription");
const cache = require("../cache.js");
const log = require("debug")("lecturebot:commands");
const logCache = require("debug")("lecturebot:cache");

const updateSubscriptions = async data => {
  cache.setChannelSubscriptions(await subscription.getSubscriptions());
  logCache("UPDATED cache.channelSubscriptions", cache.channelSubscriptions);
  return data;
};

const slashCommands = {
  "/lecturebot-activate": ({ channel, user }) => {
    log("/lecturebot-activate called!", { channel, user });
    return subscription
      .createSubscription({ channel, user })
      .then(updateSubscriptions)
      .then(message =>
        typeof message === "string"
          ? message
          : `> Lecturebot activated in ${cache.allChannels[channel] ||
              "[private channel]"}`
      );
  },
  "/lecturebot-deactivate": ({ channel, user }) => {
    log("/lecturebot-deactivate called!", { channel, user });
    return subscription
      .removeSubscription({ channel, user })
      .then(updateSubscriptions)
      .then(
        message =>
          message ||
          `> Lecturebot disabled in ${cache.allChannels[channel] ||
            "[private channel]"}`
      );
  },
  "/lecturebot-check": ({ channel }) => {
    log("/lecturebot-check called!", { channel });
    return subscription.getSubscriptions().then(channelSubscriptions => {
      log(`Is ${channel} in list: ${channelSubscriptions.join(", ")}...`);
      return `> The current channel ${cache.allChannels[channel] ||
        "[private channel]"} is ${
        cache.isSubscribed(channel) ? "ENABLED" : "NOT ENABLED"
      }`;
    });
  }
};

module.exports = function init(controller) {
  log(
    `======\nRegistered Commands: \n  ${Object.keys(slashCommands).join(
      ",\n  "
    )}\n======\n`
  );
  controller.on("slash_command", (bot, message) => {
    const user =
      message.user && message.user.id ? message.user.id : message.user;
    const channel = message.channel;
    const command = message.command.toLowerCase();

    if (!slashCommands[command]) {
      log("Lecturebot ignoring unknown command: " + command);
      return;
    }

    log(`Command ${command} has payload: `, JSON.stringify(message));

    return slashCommands[command]({ channel, user })
      .then(displayMessage => bot.replyPublic(message, `${displayMessage}`))
      .catch(error => {
        console.error("ERROR on slash command", error, message);
        return bot.replyPublic(
          message,
          ":yikes: There was an error. Check server logs!"
        );
      });
  });
};

module.exports.slashCommands = slashCommands;
