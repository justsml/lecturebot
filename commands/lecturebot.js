const subscription = require("../subscription");
const cache = require("../cache.js");
const log = require("debug")("lecturebot:commands");

const updateSubscriptions = async () => {
  cache.setChannelSubscriptions(await subscription.getSubscriptions());
  console.log("UPDATED cache.channelSubscriptions", cache.channelSubscriptions);
};
const slashCommands = {
  "/lecturebot-activate": ({ channel, user }) => {
    log("/lecturebot-activate called!", { channel, user });
    return subscription
      .create({ channel }, { channel, user })
      .then(
        () =>
          `> Lecturebot activated by ${user} in ${cache.allChannels[channel] ||
            "[private channel]"}`
      )
      .then(updateSubscriptions);
  },
  "/lecturebot-deactivate": ({ channel, user }) => {
    log("/lecturebot-deactivate called!", { channel, user });
    return subscription
      .deleteOne({ channel, user })
      .then(
        () =>
          `> Lecturebot disabled by ${user} in ${cache.allChannels[channel] ||
            "[private channel]"}`
      )
      .then(updateSubscriptions);
  },
  "/lecturebot-check": ({ channel }) => {
    log("/lecturebot-check called!", { channel });
    return subscription.getSubscriptions().then(channelSubscriptions => {
      return `> The current channel ${cache.allChannels[channel] ||
        "[private channel]"} is ${
        channelSubscriptions.includes(channel) ? "ENABLED" : "NOT ENABLED"
      }`;
    });
  }
};

module.exports = function init(controller) {
  console.log(
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
    return slashCommands[command]({ channel, user }).then(
      displayMessage => void bot.replyPublic(message, displayMessage)
    );
  });
};
