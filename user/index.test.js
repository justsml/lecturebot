const log = require("debug")("slackbot:user");
const mongoose = require("mongoose");
const connection = require("../db");
const UserModel = require("./index.js");
const fakeUserId = "U00000000";

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await UserModel.User.deleteMany({ userId: fakeUserId });
});

it("can handle bot creation on auth", () => {
  return UserModel.addOrUpdateBot(oauthPayload).then(user => {
    expect(user._id).toBeTruthy();
  });
});

it("can handle bot update on re-auth", () => {
  return UserModel.addOrUpdateBot(oauthPayload).then(user => {
    expect(user._id).toBeTruthy();
    return UserModel.addOrUpdateBot({
      ...oauthPayload,
      teamSlackId: "A-TEAM",
      avatar: "what is the smurfs movie"
    }).then(updatedBot => {
      log("updatedBot", updatedBot);
      expect(updatedBot.teamSlackId).toBeTruthy();
    });
  });
});

const oauthPayload = {
  ok: true,
  access_token:
    "xoxp-180006424049-180574235586-856703026565-25d2bb111eceef971371ad8e731e66dc",
  scope:
    "identify,bot,commands,channels:history,groups:history,channels:read,groups:read,mpim:read,reactions:read",
  user_id: fakeUserId,
  team_id: "T5A06CG1F",
  enterprise_id: null,
  team_name: "laserkittenattack",
  bot: {
    bot_user_id: "UQYNCA1HP",
    bot_access_token: "xoxb-180006424049-848760341601-sang7MXX0WtXvk9mKma4JJ49"
  },
  response_metadata: {}
};
