const subscription = require('../subscription/index.js')
const cache = require('../cache.js')
const logger = require('../utils/slack-logger.js')
const { formatReaction } = require('../utils/slack-transformer.js')

const checkCache = async () => {
  if (cache.channelSubscriptions.length < 1) {
    cache.setChannelSubscriptions(await subscription.getSubscriptions())
  }
}

module.exports = function init (controller) {
  controller.on('reaction_added', async (bot, event) => {
    await checkCache()
    if (cache.channelSubscriptions.includes(event.channel)) {
      console.log('REACTION ADDED', event.channel, cache.allChannels[event.channel], JSON.stringify(event))
      const payload = formatReaction(event)
      logger.logReactionAdded(payload)
    }
  })

  controller.on('reaction_removed', async (bot, event) => {
    await checkCache()
    if (cache.channelSubscriptions.includes(event.channel)) {
      console.log('REACTION REMOVED', event.channel, cache.allChannels[event.channel], JSON.stringify(event))
      const payload = formatReaction(event)
      logger.logReactionRemoved(payload)
    }
  })
}
