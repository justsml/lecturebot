const { logEvent } = require('./segment.js')

module.exports.logReactionAdded = logEvent('Reaction Added')
module.exports.logReactionRemoved = logEvent('Reaction Removed')

module.exports.logMessage = logEvent('Message Received')
module.exports.logMessageReply = logEvent('Message Reply Received')
module.exports.logMessageChanged = logEvent('Message Changed')
module.exports.logMessageDeleted = logEvent('Message Deleted')
