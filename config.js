require("dotenv").config();
const isTestEnv = process.env.NODE_ENV === "test";
const isDevEnv = process.env.NODE_ENV === "development";
const isProdEnv = process.env.NODE_ENV === "production";
const isCI = Boolean(process.env.CI);
const missingKeys = [
  "SLACK_REDIRECT_URI",
  "SLACK_CLIENT_ID",
  "SLACK_CLIENT_SECRET",
  "SLACK_SIGNING_SECRET",
  "SLACK_BOT_OAUTH_ACCESS_TOKEN"
].filter(expectKey => !process.env[expectKey]);

if (missingKeys.length > 0)
  throw new Error(`Required: ${missingKeys.join(", ")}`);

process.env.SLACK_REDIRECT_URI = process.env.SLACK_REDIRECT_URI.replace(
  /\/$/,
  ""
);

module.exports = {
  isCI,
  isProdEnv,
  isDevEnv,
  isTestEnv,
  baseUrl: process.env.BASE_URI,
  segment_key: process.env.SEGMENT_IO_KEY,
  slack: {
    appId: process.env.SLACK_APP_ID,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    oauthAccessToken: process.env.SLACK_OAUTH_ACCESS_TOKEN,
    botOAuthAccessToken: process.env.SLACK_BOT_OAUTH_ACCESS_TOKEN,
    incomingWebhookBot: process.env.SLACK_INCOMING_WEBHOOK_BOT,
    verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
    redirectUri: process.env.SLACK_REDIRECT_URI
  }
};
