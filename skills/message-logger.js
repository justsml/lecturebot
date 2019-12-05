const log = require("debug")("lecturebot:message-logger");
const subscription = require("../subscription/index.js");
const cache = require("../cache.js");
const logger = require("../utils/slack-logger.js");
const { formatMessage } = require("../utils/slack-transformer.js");

module.exports = function init(controller) {
  log("Registered Event Handler: message, message_changed, message_deleted");
  controller.on("message", message);
  controller.on("message_changed", messageChanged);
  controller.on("message_deleted", messageDeleted);
};

const checkCache = async () => {
  if (cache.channelSubscriptions.length < 1) {
    cache.setChannelSubscriptions(await subscription.getSubscriptions());
  }
};

// For testing!
module.exports.message = message;
module.exports.messageChanged = messageChanged;
module.exports.messageDeleted = messageDeleted;

async function messageDeleted(bot, message) {
  await checkCache();
  if (cache.isSubscribed(message.channel)) {
    log(
      "message_deleted! In Subscription:",
      cache.isSubscribed(message.channel)
    );
    // if (log.enabled)
    log("EVENT: message_deleted:", JSON.stringify(message));

    const payload = formatMessage(message);
    payload.deleted_ts = message.deleted_ts;
    payload.userId = payload.userId || "n/a"; // NOTE: botkit seems to eat the user id for deletes
    logger.logMessageDeleted(payload);
  }
}
async function messageChanged(bot, message) {
  log("message_changed! Subscribed?", cache.isSubscribed(message.channel));
  // if (log.enabled)
  log("EVENT: message_changed:", JSON.stringify(message));
  await checkCache();
  if (cache.isSubscribed(message.channel)) {
    const payload = formatMessage(message);
    logger.logMessageChanged(payload);
  }
}

async function message(bot, message) {
  // if (log.enabled)
  log("EVENT: message:", JSON.stringify(message));
  log(
    "Event: message! Is Channel Subscribed?",
    cache.allChannels[message.channel],
    cache.isSubscribed(message.channel)
  );
  await checkCache();
  if (cache.isSubscribed(message.channel)) {
    const payload = formatMessage(message);
    log("EVENT: message:", JSON.stringify(message));
    return payload.event_type === "message"
      ? logger.logMessage(payload)
      : logger.logMessageReply(payload);
  }
}
