const mongoose = require("mongoose");
const connection = require("../db");
const lecturebot = require("./lecturebot.js");

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  const Subscription = mongoose.model("Subscription");
  await Subscription.deleteMany({ channel: "G00000000" });
});

// Helpers
const subscribeChannel = () =>
  lecturebot.slashCommands["/lecturebot-activate"]({
    channel: "G00000000",
    user: "U00000000"
  });

// describe("Slash commands", () => {
it("can activate channel stats", () => {
  return subscribeChannel().then(response => {
    expect(response).toContain("Created subscription");
  });
});

it("cannot double-activate channel", () => {
  return subscribeChannel()
    .then(subscribeChannel)
    .then(response => {
      expect(response).toContain("Already exists.");
    });
});

it("can deactivate channel", () => {
  return subscribeChannel().then(result => {
    return lecturebot.slashCommands["/lecturebot-deactivate"]({
      channel: "G00000000",
      user: "U00000000"
    }).then(response => {
      expect(response).toContain("Lecturebot disabled");
    });
  });
});
it("can check non-subscribed channel", () => {
  return lecturebot.slashCommands["/lecturebot-check"]({
    channel: "G00000000",
    user: "U00000000"
  }).then(response => {
    expect(response).toContain("NOT ENABLED");
  });
});
it("can check subscribed channel", () => {
  return subscribeChannel().then(() => {
    return lecturebot.slashCommands["/lecturebot-check"]({
      channel: "G00000000",
      user: "U00000000"
    }).then(response => {
      expect(response).toContain("is ENABLED");
    });
  });
});
// });

const commandPayloads = {
  activate: {
    token: "F8mRwkSJtkysI5ncD7C315e8",
    team_id: "T5A06CG1F",
    team_domain: "laserkittenattack",
    channel_id: "GQPMB0G3Y",
    channel_name: "privategroup",
    user_id: "U5AGW6XH8",
    user_name: "justsml",
    command: "/lecturebot-activate",
    text: "",
    response_url:
      "https://hooks.slack.com/commands/T5A06CG1F/857099720080/JJLKRV4nywtidULyx4hFyn41",
    trigger_id: "849166719521.180006424049.96f0765263ebe3988d0d2e1bbc5ef186",
    team: "T5A06CG1F",
    botkitEventType: "slash_command",
    type: "slash_command",
    user: "U5AGW6XH8",
    channel: "GQPMB0G3Y",
    reference: {
      activityId: "849166719521.180006424049.96f0765263ebe3988d0d2e1bbc5ef186",
      user: { id: "U5AGW6XH8" },
      bot: { id: "U5AGW6XH8" },
      conversation: { id: "GQPMB0G3Y", team: "T5A06CG1F" },
      channelId: "slack"
    },
    incoming_message: {
      id: "849166719521.180006424049.96f0765263ebe3988d0d2e1bbc5ef186",
      timestamp: "2019-12-03T01:53:31.527Z",
      channelId: "slack",
      conversation: { id: "GQPMB0G3Y", team: "T5A06CG1F" },
      from: { id: "U5AGW6XH8" },
      recipient: { id: "U5AGW6XH8" },
      channelData: {
        token: "F8mRwkSJtkysI5ncD7C315e8",
        team_id: "T5A06CG1F",
        team_domain: "laserkittenattack",
        channel_id: "GQPMB0G3Y",
        channel_name: "privategroup",
        user_id: "U5AGW6XH8",
        user_name: "justsml",
        command: "/lecturebot-activate",
        text: "",
        response_url:
          "https://hooks.slack.com/commands/T5A06CG1F/857099720080/JJLKRV4nywtidULyx4hFyn41",
        trigger_id:
          "849166719521.180006424049.96f0765263ebe3988d0d2e1bbc5ef186",
        team: "T5A06CG1F",
        botkitEventType: "slash_command"
      },
      text: "",
      type: "event"
    }
  }
};
