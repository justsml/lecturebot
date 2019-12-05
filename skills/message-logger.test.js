const messageLogger = require("./message-logger.js");

const mockController = {
  on: jest.fn()
};

it("can register event listeners", () => {
  messageLogger(mockController);
  expect(mockController.on.mock.calls.length).toEqual(3);
  expect(mockController.on.mock.calls[0][0]).toEqual("message");
  expect(mockController.on.mock.calls[1][0]).toEqual("message_changed");
  expect(mockController.on.mock.calls[2][0]).toEqual("message_deleted");
});

it("can log main messages", () => {
  const bot = jest.fn();
  const result = messageLogger.message(bot, messagePayload);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

it("can log reply messages", () => {
  const bot = jest.fn();
  const result = messageLogger.message(bot, aReplyMessage);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

it("can log deleted messages", () => {
  const bot = jest.fn();
  const result = messageLogger.messageDeleted(bot, aDeletedMessage);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

it("can log changed messages", () => {
  const bot = jest.fn();
  const result = messageLogger.messageChanged(bot, aChangedMessage);
  expect(bot.mock.calls.length).toBe(0);
  return result;
});

const messagePayload = {
  client_msg_id: "0b1686b3-92ab-45d4-be58-ff7319a12a7d",
  type: "message",
  text: ":question: Instructor question :heycat:",
  user: "U5AGW6XH8",
  ts: "1575538192.000900",
  team: "T5A06CG1F",
  blocks: [
    {
      type: "rich_text",
      block_id: "0I/I9",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            { type: "emoji", name: "question" },
            { type: "text", text: " Instructor question " },
            { type: "emoji", name: "heycat" }
          ]
        }
      ]
    }
  ],
  channel: "GPRU48MMH",
  event_ts: "1575538192.000900",
  channel_type: "group",
  reference: {
    activityId: "1575538192.000900",
    user: { id: "U5AGW6XH8" },
    bot: { id: "U5AGW6XH8" },
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575538192.000900",
    timestamp: "2019-12-05T09:29:55.561Z",
    channelId: "slack",
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    from: { id: "U5AGW6XH8" },
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      client_msg_id: "0b1686b3-92ab-45d4-be58-ff7319a12a7d",
      type: "message",
      text: ":question: Instructor question :heycat:",
      user: "U5AGW6XH8",
      ts: "1575538192.000900",
      team: "T5A06CG1F",
      blocks: [
        {
          type: "rich_text",
          block_id: "0I/I9",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                { type: "emoji", name: "question" },
                { type: "text", text: " Instructor question " },
                { type: "emoji", name: "heycat" }
              ]
            }
          ]
        }
      ],
      channel: "GPRU48MMH",
      event_ts: "1575538192.000900",
      channel_type: "group"
    },
    text: ":question: Instructor question :heycat:",
    type: "message"
  }
};

const aReplyMessage = {
  client_msg_id: "9ab9e15d-1b9e-41c7-9b8e-7d602e442e92",
  type: "message",
  text: "A reply!!! :catdance:",
  user: "U5AGW6XH8",
  ts: "1575538986.001000",
  team: "T5A06CG1F",
  blocks: [
    {
      type: "rich_text",
      block_id: "4rBSf",
      elements: [
        {
          type: "rich_text_section",
          elements: [
            { type: "text", text: "A reply!!! " },
            { type: "emoji", name: "catdance" }
          ]
        }
      ]
    }
  ],
  thread_ts: "1575538192.000900",
  parent_user_id: "U5AGW6XH8",
  channel: "GPRU48MMH",
  event_ts: "1575538986.001000",
  channel_type: "group",
  reference: {
    activityId: "1575538986.001000",
    user: { id: "U5AGW6XH8" },
    bot: { id: "U5AGW6XH8" },
    conversation: {
      id: "GPRU48MMH",
      thread_ts: "1575538192.000900",
      team: "T5A06CG1F"
    },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575538986.001000",
    timestamp: "2019-12-05T09:44:15.224Z",
    channelId: "slack",
    conversation: {
      id: "GPRU48MMH",
      thread_ts: "1575538192.000900",
      team: "T5A06CG1F"
    },
    from: { id: "U5AGW6XH8" },
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      client_msg_id: "9ab9e15d-1b9e-41c7-9b8e-7d602e442e92",
      type: "message",
      text: "A reply!!! :catdance:",
      user: "U5AGW6XH8",
      ts: "1575538986.001000",
      team: "T5A06CG1F",
      blocks: [
        {
          type: "rich_text",
          block_id: "4rBSf",
          elements: [
            {
              type: "rich_text_section",
              elements: [
                { type: "text", text: "A reply!!! " },
                { type: "emoji", name: "catdance" }
              ]
            }
          ]
        }
      ],
      thread_ts: "1575538192.000900",
      parent_user_id: "U5AGW6XH8",
      channel: "GPRU48MMH",
      event_ts: "1575538986.001000",
      channel_type: "group"
    },
    text: "A reply!!! :catdance:",
    type: "message"
  }
};
const aDeletedMessage = {
  type: "message_deleted",
  subtype: "message_deleted",
  hidden: true,
  deleted_ts: "1575538996.001200",
  channel: "GPRU48MMH",
  previous_message: {
    client_msg_id: "f99df859-39f2-43a4-be79-8f07a3a9d912",
    type: "message",
    text: "Another - we'll delete in a sec... :roo-panda-yikes:",
    user: "U5AGW6XH8",
    ts: "1575538996.001200",
    team: "T5A06CG1F",
    blocks: [
      {
        type: "rich_text",
        block_id: "XZJm",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              { type: "text", text: "Another - we'll delete in a sec... " },
              { type: "emoji", name: "roo-panda-yikes" }
            ]
          }
        ]
      }
    ],
    thread_ts: "1575538192.000900",
    parent_user_id: "U5AGW6XH8"
  },
  event_ts: "1575539648.001400",
  ts: "1575539648.001400",
  channel_type: "group",
  team: "T5A06CG1F",
  botkitEventType: "message_deleted",
  text: null,
  reference: {
    activityId: "1575539648.001400",
    user: {},
    bot: { id: "U5AGW6XH8" },
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575539648.001400",
    timestamp: "2019-12-05T09:54:12.053Z",
    channelId: "slack",
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    from: {},
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      type: "message",
      subtype: "message_deleted",
      hidden: true,
      deleted_ts: "1575538996.001200",
      channel: "GPRU48MMH",
      previous_message: {
        client_msg_id: "f99df859-39f2-43a4-be79-8f07a3a9d912",
        type: "message",
        text: "Another - we'll delete in a sec... :roo-panda-yikes:",
        user: "U5AGW6XH8",
        ts: "1575538996.001200",
        team: "T5A06CG1F",
        blocks: [
          {
            type: "rich_text",
            block_id: "XZJm",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  { type: "text", text: "Another - we'll delete in a sec... " },
                  { type: "emoji", name: "roo-panda-yikes" }
                ]
              }
            ]
          }
        ],
        thread_ts: "1575538192.000900",
        parent_user_id: "U5AGW6XH8"
      },
      event_ts: "1575539648.001400",
      ts: "1575539648.001400",
      channel_type: "group",
      team: "T5A06CG1F",
      botkitEventType: "message_deleted"
    },
    text: null,
    type: "event"
  }
};
const aChangedMessage = {
  type: "message_changed",
  subtype: "message_changed",
  hidden: true,
  message: {
    client_msg_id: "bf491772-af99-4b7f-8545-30414247a4c8",
    type: "message",
    text: "Test - Fixed :success:",
    user: "U5AGW6XH8",
    team: "T5A06CG1F",
    edited: { user: "U5AGW6XH8", ts: "1575555028.000000" },
    blocks: [
      {
        type: "rich_text",
        block_id: "qE4OJ",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              { type: "text", text: "Test - Fixed " },
              { type: "emoji", name: "success" }
            ]
          }
        ]
      }
    ],
    ts: "1575555011.000200",
    user_team: "T5A06CG1F",
    source_team: "T5A06CG1F"
  },
  channel: "GPRU48MMH",
  previous_message: {
    client_msg_id: "bf491772-af99-4b7f-8545-30414247a4c8",
    type: "message",
    text: "Tets",
    user: "U5AGW6XH8",
    ts: "1575555011.000200",
    team: "T5A06CG1F",
    blocks: [
      {
        type: "rich_text",
        block_id: "Cqp",
        elements: [
          {
            type: "rich_text_section",
            elements: [{ type: "text", text: "Tets" }]
          }
        ]
      }
    ]
  },
  event_ts: "1575555028.000300",
  ts: "1575555028.000300",
  channel_type: "group",
  team: "T5A06CG1F",
  botkitEventType: "message_changed",
  text: null,
  reference: {
    activityId: "1575555028.000300",
    user: {},
    bot: { id: "U5AGW6XH8" },
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    channelId: "slack"
  },
  incoming_message: {
    id: "1575555028.000300",
    timestamp: "2019-12-05T14:10:29.489Z",
    channelId: "slack",
    conversation: { id: "GPRU48MMH", team: "T5A06CG1F" },
    from: {},
    recipient: { id: "U5AGW6XH8" },
    channelData: {
      type: "message",
      subtype: "message_changed",
      hidden: true,
      message: {
        client_msg_id: "bf491772-af99-4b7f-8545-30414247a4c8",
        type: "message",
        text: "Test - Fixed :success:",
        user: "U5AGW6XH8",
        team: "T5A06CG1F",
        edited: { user: "U5AGW6XH8", ts: "1575555028.000000" },
        blocks: [
          {
            type: "rich_text",
            block_id: "qE4OJ",
            elements: [
              {
                type: "rich_text_section",
                elements: [
                  { type: "text", text: "Test - Fixed " },
                  { type: "emoji", name: "success" }
                ]
              }
            ]
          }
        ],
        ts: "1575555011.000200",
        user_team: "T5A06CG1F",
        source_team: "T5A06CG1F"
      },
      channel: "GPRU48MMH",
      previous_message: {
        client_msg_id: "bf491772-af99-4b7f-8545-30414247a4c8",
        type: "message",
        text: "Tets",
        user: "U5AGW6XH8",
        ts: "1575555011.000200",
        team: "T5A06CG1F",
        blocks: [
          {
            type: "rich_text",
            block_id: "Cqp",
            elements: [
              {
                type: "rich_text_section",
                elements: [{ type: "text", text: "Tets" }]
              }
            ]
          }
        ]
      },
      event_ts: "1575555028.000300",
      ts: "1575555028.000300",
      channel_type: "group",
      team: "T5A06CG1F",
      botkitEventType: "message_changed"
    },
    text: null,
    type: "event"
  }
};
