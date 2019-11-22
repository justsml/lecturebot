const messageLogger = require('./message-logger.js')
const reactionLogger = require('./reaction-logger.js')

module.exports = function init (controller) {
  messageLogger(controller)
  reactionLogger(controller)
  return controller
}
