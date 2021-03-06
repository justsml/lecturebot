const log = require("debug")("lecturebot:create:botkit");
// const path = require('path')
const { Botkit } = require("botkit");
// const mongoStorage = require('botkit-storage-mongo')
const config = require("./config.js");
const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware
} = require("botbuilder-adapter-slack");

module.exports.createBot = function createBot({ scopes }) {
  // if (process.env.MONGODB_URI) {
  //   botOptions.storage = mongoStorage({ mongoUri: process.env.MONGODB_URI })
  // } else {
  //   botOptions.json_file_store = path.join(__dirname, '..', '..', '.data', 'db')
  // }
  const adapter = new SlackAdapter({
    botToken: config.slack.botOAuthAccessToken,
    clientId: config.slack.clientId,
    clientSecret: config.slack.clientSecret,
    clientSigningSecret: config.slack.signingSecret,
    redirectUri: config.slack.redirectUri,
    // logger: {
    //   log: (level, ...args) => {
    //     args.every(arg => typeof arg === "string")
    //       ? console[level](args.join(" "))
    //       : console[level](...args);
    //     if (level === "error" || level === "warn") log(...args);
    //   }
    // },
    scopes
  });
  adapter.use(new SlackEventMiddleware());
  adapter.use(new SlackMessageTypeMiddleware());
  const controller = new Botkit({
    webhook_uri: "/api/messages",
    adapter,
    disable_webserver: config.isCI
    // storage: mongoStorage
  });
  log("Created Botkit Client w/ Slack Adapter");
  return { controller, adapter };
};
