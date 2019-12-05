const log = require("debug")("lecturebot:slack-transformer");
/* eslint camelcase: 0 */
const cache = require("../cache.js");

module.exports.formatMessage = payload => {
  log("INCOMING.PRE_FORMAT:", JSON.stringify(payload));
  if (payload.thread_ts && payload.thread_ts === payload.ts) {
    // parent message doesn't need a thread_ts property
    payload.thread_ts = null;
  }
  const { message } = payload;

  const msg = {
    ts: payload.ts,
    parent_user_id: payload.parent_user_id,
    client_msg_id: payload.client_msg_id || (message && message.client_msg_id),
    thread_ts: payload.thread_ts || null,
    userId: payload.user ? payload.user : message && message.user,
    channel: payload.channel,
    channel_name: cache.allChannels[payload.channel] || "Unknown",
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

  if (message && message.edited) {
    msg.userId =
      msg.userId ||
      payload.userId ||
      (message && message.edited && message.edited.user);
    msg.edited_ts = message && message.edited && message.edited.ts;
  }

  if (payload && payload.deleted_ts) {
    msg.userId = msg.userId || payload.incoming_message.recipient.id;
    msg.thread_ts = msg.thread_ts || payload.previous_message.thread_ts;
    msg.text = msg.text || payload.previous_message.text;
    msg.parent_user_id =
      msg.parent_user_id || payload.previous_message.parent_user_id;
    msg.client_msg_id =
      msg.client_msg_id || payload.previous_message.client_msg_id;
  }

  log("POST_FORMAT:", JSON.stringify(msg));
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
