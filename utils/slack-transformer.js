/* eslint camelcase: 0 */
const cache = require("../cache.js");

module.exports.formatMessage = payload => {
  console.log("INCOMING.PRE_FORMAT:", JSON.stringify(payload));
  if (payload.thread_ts && payload.thread_ts === payload.ts) {
    // parent message doesn't need a thread_ts property
    payload.thread_ts = null;
  }
  const { message } = payload;

  const msg = {
    ts: payload.ts,
    client_msg_id: message && message.client_msg_id,
    thread_ts: payload.thread_ts || null,
    userId: payload.user ? payload.user : message && message.user,
    channel: payload.channel,
    channel_name: cache.allChannels[payload.channel],
    text: payload.text ? payload.text : message && message.text,
    team: payload.team,
    event_type: payload.thread_ts
      ? "message_replied"
      : payload.subtype || payload.type,
    reply_count: message && message.reply_count,
    reply_users: message && message.reply_users,
    reply_users_count: message && message.reply_users_count,
    replies: message && message.replies,
    latest_reply: message && message.latest_reply,
    reactions: payload.reactions || (message && message.reactions),
    pinned_to: payload.pinned_to || (message && message.pinned_to)
  };

  if (message.edited) {
    payload.userId =
      payload.userId || (message && message.edited && message.edited.user);
    payload.edited_ts = message && message.edited && message.edited.ts;
  }

  console.log("POST_FORMAT:", JSON.stringify(msg));
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
