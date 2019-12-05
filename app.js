const log = require("debug")("lecturebot:app");
const { addOrUpdateBot, addOrUpdateUser } = require("./user/index.js");
const subscription = require("./subscription/index.js");
const { createBot } = require("./create.js");
const cache = require("./cache.js");
const bot = createBot({ scopes: ["bot"] });
const { controller } = bot;
const tokenCache = {};
const userCache = {};
const skills = require("./skills/index.js");
const commands = require("./commands/index.js");

/**
 * TODO
 * channel name
 * seperate out main messages & replies
 * emojis (added/removed)
 * add message edits & deletes
 * segment
 * permalink
 *
 */

controller.ready(async () => {
  console.log(`\nBotkit App is Running!\n`);
  botHelpers(bot)
    .getChannels({})
    .then(channels => log("Loaded Channels:", channels))
    .catch(console.error);
  const subscriptions = await subscription.getSubscriptions();
  cache.setChannelSubscriptions(subscriptions);
  log("Found Subscriptions:", subscriptions);

  skills(controller);
  commands(controller);
});

const server = controller.webserver;

/**
 * This module implements the oauth routes needed to install an app
 */
server.get("/install", (req, res) => {
  // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
  res.redirect(controller.adapter.getInstallLink());
});

server.get("/install/auth", async (req, res) => {
  log("Auth Requested");
  try {
    const results = await controller.adapter.validateOauthCode(req.query.code);

    log("FULL OAUTH DETAILS", JSON.stringify(results));

    if (results.bot && results.bot.bot_user_id) {
      await addOrUpdateBot(results);
    }
    if (results.user && results.user.id) {
      await addOrUpdateUser(results);
    }

    // // Store token by team in bot state.
    tokenCache[results.team_id] = results.bot.bot_access_token;

    // // Capture team to bot id
    userCache[results.team_id] = results.bot.bot_user_id;

    res.json("Success! Bot installed.");
  } catch (err) {
    console.error("OAUTH ERROR:", err);
    res.status(401);
    res.send(err.message);
  }
});

server.get("/", (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});

const botHelpers = ({ adapter: { slack: client } }) => ({
  /**
   * https://api.slack.com/methods/users.info
   * @param {string} userId
   * @return {User} https://api.slack.com/types/user
   */
  async getUser(userId) {
    await client.users.info({ user: userId });
  },
  getChannels({ cursor }) {
    // console.log('API:', client)
    return client.conversations
      .list({
        limit: 1000,
        cursor,
        types: "public_channel,private_channel"
      })
      .then(results => {
        // console.log('CHANNEL DATA INITIALIZED', JSON.stringify(results, null, 2))
        return results.channels.reduce((acc, channel) => {
          acc[channel.id] = channel.name;
          return acc;
        }, {});
      })
      .then(channels => {
        cache.setAllChannels(channels);
        return channels;
      });
  }
});
