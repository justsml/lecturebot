const subscription = require('../subscription/index.js')
const cache = require('../cache.js')
const logger = require('../utils/slack-logger.js')
const { formatMessage } = require('../utils/slack-transformer.js')

const checkCache = async () => {
  if (cache.channelSubscriptions.length < 1) {
    cache.setChannelSubscriptions(await subscription.getSubscriptions())
  }
}

module.exports = function init (controller) {
  controller.on('message_changed', async (bot, message) => {
    await checkCache()
    if (cache.channelSubscriptions.includes(message.channel)) {
      console.log('EVENT: message_changed:', message.channel, cache.allChannels[message.channel], JSON.stringify(message))
      const payload = formatMessage(message)
      payload.userId = payload.userId || (payload.message && payload.message.edited && payload.message.edited.user)
      payload.edited_ts = payload.message && payload.message.edited && payload.message.edited.ts
      logger.logMessageChanged(payload)
    }
  })

  controller.on('message_deleted', async (bot, message) => {
    await checkCache()
    if (cache.channelSubscriptions.includes(message.channel)) {
      console.log('EVENT: message_deleted:', message.channel, cache.allChannels[message.channel], JSON.stringify(message))
      const payload = formatMessage(message)
      payload.deleted_ts = message.deleted_ts
      payload.userId = payload.userId || 'n/a' // NOTE: botkit seems to eat the user id for deletes
      logger.logMessageDeleted(payload)
    }
  })

  controller.on('message', async (bot, message) => {
    await checkCache()
    if (cache.channelSubscriptions.includes(message.channel)) {
      const payload = formatMessage(message)
      console.log('EVENT: message:', message.channel, cache.allChannels[message.channel], JSON.stringify(message))
      // console.log('channel SUBSCRIBED', message.channel, cache.allChannels[message.channel], payload)
      if (payload.event_type === 'message') {
        logger.logMessage(payload)
      } else {
        logger.logMessageReply(payload)
      }
    }
  })
}
