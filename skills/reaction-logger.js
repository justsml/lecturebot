const log = require("debug")("lecturebot:reaction-logger");
const subscription = require("../subscription/index.js");
const cache = require("../cache.js");
const logger = require("../utils/slack-logger.js");
const { formatReaction } = require("../utils/slack-transformer.js");

const checkCache = async () => {
  if (cache.channelSubscriptions.length < 1) {
    cache.setChannelSubscriptions(await subscription.getSubscriptions());
  }
};

async function reactionAdded(bot, event) {
  await checkCache();
  if (cache.channelSubscriptions.includes(event.channel)) {
    console.log("REACTION ADDED", JSON.stringify(event));
    const payload = formatReaction(event);
    logger.logReactionAdded(payload);
  }
}

async function reactionRemoved(bot, event) {
  await checkCache();
  if (cache.channelSubscriptions.includes(event.channel)) {
    console.log("REACTION REMOVED", JSON.stringify(event));
    const payload = formatReaction(event);
    logger.logReactionRemoved(payload);
  }
}

module.exports = function init(controller) {
  log("Listening for: reaction_added, reaction_removed");
  controller.on("reaction_added", reactionAdded);
  controller.on("reaction_removed", reactionRemoved);
};
