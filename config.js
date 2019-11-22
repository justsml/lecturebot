require('dotenv').config()

if (!process.env.SLACK_REDIRECT_URI) throw new Error('Required ENV: SLACK_REDIRECT_URI')
if (!process.env.SLACK_CLIENT_ID) throw new Error('Required ENV: SLACK_CLIENT_ID')
if (!process.env.SLACK_CLIENT_SECRET) throw new Error('Required ENV: SLACK_CLIENT_SECRET')
if (!process.env.SLACK_SIGNING_SECRET) throw new Error('Required ENV: SLACK_SIGNING_SECRET')
if (!process.env.SLACK_BOT_OAUTH_ACCESS_TOKEN) throw new Error('Required ENV: SLACK_BOT_OAUTH_ACCESS_TOKEN')

process.env.SLACK_REDIRECT_URI = process.env.SLACK_REDIRECT_URI.replace(/\/$/, '')

module.exports = {
  baseUrl: process.env.BASE_URI,
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
}
