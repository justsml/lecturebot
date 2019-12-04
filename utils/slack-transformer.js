/* eslint camelcase: 0 */
const cache = require("../cache.js");

module.exports.formatMessage = message => {
  console.log("INCOMING.PRE_FORMAT:", JSON.stringify(message, null, 2));
  if (message.thread_ts && message.thread_ts === message.ts) {
    // parent message doesn't need a thread_ts property
    message.thread_ts = null;
  }
  const msg = {
    ts: message.ts,
    client_msg_id: message && message.message && message.message.client_msg_id,
    thread_ts: message.thread_ts || null,
    userId: message.user
      ? message.user
      : message && message.message && message.message.user,
    channel: message.channel,
    channel_name: cache.allChannels[message.channel],
    text: message.text
      ? message.text
      : message && message.message && message.message.text,
    team: message.team,
    event_type: message.thread_ts
      ? "message_replied"
      : message.subtype || message.type,
    reply_count: message && message.message && message.message.reply_count,
    reply_users: message && message.message && message.message.reply_users,
    reply_users_count:
      message && message.message && message.message.reply_users_count,
    replies: message && message.message && message.message.replies,
    latest_reply: message && message.message && message.message.latest_reply,
    reactions:
      message.reactions ||
      (message && message.message && message.message.reactions),
    pinned_to:
      message.pinned_to ||
      (message && message.message && message.message.pinned_to)
  };
  console.log("INCOMING.POST_FORMAT:", JSON.stringify(msg, null, 2));
  return msg;
};

module.exports.formatReaction = ({
  event_type = "reaction_added",
  reaction,
  channel,
  user,
  team,
  text,
  type,
  event_ts,
  item: { ts: message_ts }
}) => {
  return {
    reaction,
    channel,
    channel_name: cache.allChannels[channel],
    userId: user,
    user,
    team,
    text,
    type,
    event_ts,
    message_ts,
    event_type
  };
};
