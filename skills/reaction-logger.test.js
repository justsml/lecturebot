const reactionLogger = require("./reaction-logger.js");

const mockController = {
  on: jest.fn()
};

it("can register event listeners", () => {
  reactionLogger(mockController);
  expect(mockController.on.mock.calls.length).toEqual(2);
  expect(mockController.on.mock.calls[0][0]).toEqual("reaction_added");
  expect(mockController.on.mock.calls[1][0]).toEqual("reaction_removed");
});

it("can log reaction added", () => {
  const bot = jest.fn();
  const result = reactionLogger.reactionAdded(bot, reactionAddedPayload);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

it("can log reaction removed", () => {
  const bot = jest.fn();
  const result = reactionLogger.reactionRemoved(bot, reactionRemovedPayload);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

const reactionAddedPayload = {
  type: "reaction_added",
  user: "U5AGW6XH8",
  item: { type: "message", channel: "GPRU48MMH", ts: "1575538986.001000" },
  reaction: "roo-panda-clap",
  item_user: "U5AGW6XH8",
  event_ts: "1575573200.000200",
  team: "T5A06CG1F",
  botkitEventType: "reaction_added",
  text: null,
  channel: "GPRU48MMH",
  reference: {
    activityId: "1575573200.000200",
    user: { id: "U5AGW6XH8" },
    bot: { id: "U5AGW6XH8" },
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575573200.000200",
    timestamp: "2019-12-05T19:13:45.576Z",
    channelId: "slack",
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    from: { id: "U5AGW6XH8" },
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      type: "reaction_added",
      user: "U5AGW6XH8",
      item: { type: "message", channel: "GPRU48MMH", ts: "1575538986.001000" },
      reaction: "roo-panda-clap",
      item_user: "U5AGW6XH8",
      event_ts: "1575573200.000200",
      team: "T5A06CG1F",
      botkitEventType: "reaction_added"
    },
    text: null,
    type: "event"
  }
};
const reactionRemovedPayload = {
  type: "reaction_removed",
  user: "U5AGW6XH8",
  item: { type: "message", channel: "GPRU48MMH", ts: "1575538986.001000" },
  reaction: "roo-panda-scared",
  item_user: "U5AGW6XH8",
  event_ts: "1575573714.000400",
  team: "T5A06CG1F",
  botkitEventType: "reaction_removed",
  text: null,
  channel: "GPRU48MMH",
  reference: {
    activityId: "1575573714.000400",
    user: { id: "U5AGW6XH8" },
    bot: { id: "U5AGW6XH8" },
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575573714.000400",
    timestamp: "2019-12-05T19:21:55.978Z",
    channelId: "slack",
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    from: { id: "U5AGW6XH8" },
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      type: "reaction_removed",
      user: "U5AGW6XH8",
      item: { type: "message", channel: "GPRU48MMH", ts: "1575538986.001000" },
      reaction: "roo-panda-scared",
      item_user: "U5AGW6XH8",
      event_ts: "1575573714.000400",
      team: "T5A06CG1F",
      botkitEventType: "reaction_removed"
    },
    text: null,
    type: "event"
  }
};
